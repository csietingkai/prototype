package io.tingkai.prototype.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.service.UserService;

@Service
public class UsernamePasswordAuthenticationService {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthTokenService authTokenService;

	public AuthToken authenticate(String username, String password) {
		try {
			User user = this.userService.findByName(username);
			return this.authTokenService.issue(user);
		} catch (UserNotFoundException e) {
			e.printStackTrace();
		}
		return null;
	}
}
