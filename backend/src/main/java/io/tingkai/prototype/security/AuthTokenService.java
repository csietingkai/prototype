package io.tingkai.prototype.security;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import io.tingkai.prototype.entity.User;

@Component
public final class AuthTokenService {
	private static final int AUTH_TOKEN_VALID_HOURS = 12;
	private static final String AUTH_TOKEN_KEY = "authToken:";
	private static final String AUTH_USER_KEY = "authUser:";

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
		calendar.add(Calendar.HOUR, AuthTokenService.AUTH_TOKEN_VALID_HOURS);
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
				.get(AuthTokenService.AUTH_USER_KEY + user.getId());

		// 如已有既有Token記錄，則刪除之
		if (existingAuthTokenString != null) {
			this.authTokenRedisTemplate.delete(AuthTokenService.AUTH_TOKEN_KEY + existingAuthTokenString);
		}

		// 刪除既有User記錄
		this.stringRedisTemplate.delete(AuthTokenService.AUTH_USER_KEY + user.getId());

		// 產生AuthToken
		AuthToken authToken = this.generate(user);

		// 將AuthToken存入Redis
		this.stringRedisTemplate.opsForValue().set(AuthTokenService.AUTH_USER_KEY + user.getId(),
				authToken.getTokenString(), AuthTokenService.AUTH_TOKEN_VALID_HOURS, TimeUnit.HOURS);
		this.authTokenRedisTemplate.opsForValue().set(AuthTokenService.AUTH_TOKEN_KEY + authToken.getTokenString(),
				authToken, AuthTokenService.AUTH_TOKEN_VALID_HOURS, TimeUnit.HOURS);

		return authToken;
	}

	public void revoke(AuthToken authToken) {
		this.stringRedisTemplate.delete(AuthTokenService.AUTH_USER_KEY + authToken.getName());
		this.authTokenRedisTemplate.delete(AuthTokenService.AUTH_TOKEN_KEY + authToken.getTokenString());
	}

	public AuthToken validate(String tokenString) {
		return this.authTokenRedisTemplate.opsForValue().get(AuthTokenService.AUTH_TOKEN_KEY + tokenString);
	}
}
