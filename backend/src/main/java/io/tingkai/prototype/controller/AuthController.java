package io.tingkai.prototype.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.exception.UserNotFoundException;
import io.tingkai.prototype.exception.WrongPasswordException;
import io.tingkai.prototype.security.AuthToken;
import io.tingkai.prototype.security.AuthTokenService;
import io.tingkai.prototype.service.MailService;
import io.tingkai.prototype.service.UserService;

/**
 * Controller let user login and register
 * 
 * @author tingkai
 */
@RestController
public class AuthController {

	public static final String LOGIN_PATH = "/login";
	public static final String REGISTER_PATH = "/register";
	public static final String CONFIRM_PATH = "/confirm";

	@Autowired
	private UserService userService;

	@Autowired
	private AuthTokenService authTokenService;

	@Autowired
	private MailService mailService;

	@RequestMapping(value = AuthController.LOGIN_PATH, method = RequestMethod.POST)

	public AuthToken login(@RequestParam String username, @RequestParam String password) throws UserNotFoundException, WrongPasswordException {
		User user = this.userService.login(username, password);
		return this.authTokenService.issue(user);
	}

	@RequestMapping(value = AuthController.REGISTER_PATH, method = RequestMethod.POST)
	public void register(@RequestBody User user) {
		this.userService.create(user);
		this.mailService.sendConfirmEmail(user.getEmail());
	}

	@RequestMapping(value = AuthController.CONFIRM_PATH, method = RequestMethod.POST)
	public void confirm(@RequestParam String email) {
		// TODO browser can not open, but postman can
		this.userService.confirm(email);
	}
}
