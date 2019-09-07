package io.tingkai.prototype.security;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import io.tingkai.prototype.entity.User;

@Service
public class AuthTokenService {
	private static final int AUTH_TOKEN_VALID_HOURS = 12;
	private static final String AUTH_USER_KEY = "authUser:";

	@Autowired
	private RedisTemplate<String, AuthToken> authTokenRedisTemplate;

	@Autowired
	private TokenStringService tokenStringService;

	public AuthToken issue(User user) {
		// check auth token for the user is existed in redis
		AuthToken authToken = this.authTokenRedisTemplate.opsForValue()
				.get(AuthTokenService.AUTH_USER_KEY + user.getId());
		if (authToken != null) {
			this.authTokenRedisTemplate.delete(AuthTokenService.AUTH_USER_KEY + user.getId());
		}
		return this.generate(user);
	}

	private AuthToken generate(User user) {
		AuthToken authToken = new AuthToken();
		authToken.setName(user.getName());
		authToken.setRole(user.getRole());
		authToken.setTokenString(this.tokenStringService.next());
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.HOUR_OF_DAY, AuthTokenService.AUTH_TOKEN_VALID_HOURS);
		authToken.setExpiryDateTime(calendar.getTime());
		return authToken;
	}
}
