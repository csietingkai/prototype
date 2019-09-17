package io.tingkai.prototype.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.exception.UserNotFoundException;
import io.tingkai.prototype.security.AuthToken;
import io.tingkai.prototype.security.AuthTokenService;
import io.tingkai.prototype.service.UserService;

@RestController
public class AuthController {

	public static final String LOGIN_PATH = "/login";

	@Autowired
	private UserService userService;

	@Autowired
	private AuthTokenService authTokenService;

	@RequestMapping(value = AuthController.LOGIN_PATH, method = RequestMethod.POST)
	public AuthToken login(@RequestParam String username, @RequestParam String password) throws UserNotFoundException {
		User user = this.userService.findByNameAndPwd(username, password);
		return this.authTokenService.issue(user);
	}
}
