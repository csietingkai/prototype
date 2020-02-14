package io.tingkai.prototype.security;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import io.tingkai.prototype.constant.CodeConstants;
import io.tingkai.prototype.entity.User;

@Component
public final class AuthTokenService {

	@Autowired
	private RedisTemplate<String, String> stringRedisTemplate;

	@Autowired
	private RedisTemplate<String, AuthToken> authTokenRedisTemplate;

	@Autowired
	private TokenStringService tokenStringService;

	private AuthToken generate(User user) {
		String tokenString = this.tokenStringService.next();

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.HOUR, CodeConstants.AUTH_TOKEN_VALID_HOURS);
		Date expiryDate = calendar.getTime();

		AuthToken authToken = new AuthToken();
		authToken.setName(user.getName());
		authToken.setTokenString(tokenString);
		authToken.setExpiryDate(expiryDate);
		authToken.setRole(user.getRole());
		authToken.setName(user.getName());

		return authToken;
	}

	public AuthToken issue(User user) {
		String existingAuthTokenString = this.stringRedisTemplate.opsForValue()
				.get(CodeConstants.AUTH_USER_KEY + user.getId());

		// if token exist in redis, delete it
		if (existingAuthTokenString != null) {
			this.authTokenRedisTemplate.delete(CodeConstants.AUTH_TOKEN_KEY + existingAuthTokenString);
		}
		this.stringRedisTemplate.delete(CodeConstants.AUTH_USER_KEY + user.getId());

		// generate AuthToken and store it into redis
		AuthToken authToken = this.generate(user);
		this.stringRedisTemplate.opsForValue().set(CodeConstants.AUTH_USER_KEY + user.getId(),
				authToken.getTokenString(), CodeConstants.AUTH_TOKEN_VALID_HOURS, TimeUnit.HOURS);
		this.authTokenRedisTemplate.opsForValue().set(CodeConstants.AUTH_TOKEN_KEY + authToken.getTokenString(),
				authToken, CodeConstants.AUTH_TOKEN_VALID_HOURS, TimeUnit.HOURS);

		return authToken;
	}

	public void revoke(AuthToken authToken) {
		this.stringRedisTemplate.delete(CodeConstants.AUTH_USER_KEY + authToken.getName());
		this.authTokenRedisTemplate.delete(CodeConstants.AUTH_TOKEN_KEY + authToken.getTokenString());
	}

	public AuthToken validate(String tokenString) {
		return this.authTokenRedisTemplate.opsForValue().get(CodeConstants.AUTH_TOKEN_KEY + tokenString);
	}
}
