package io.tingkai.prototype.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.prototype.constant.AppConstants;
import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.enumeration.Role;
import io.tingkai.prototype.exception.UserNotFoundException;
import io.tingkai.prototype.exception.WrongPasswordException;
import io.tingkai.prototype.model.response.LoginResponse;
import io.tingkai.prototype.model.response.SimpleResponse;
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
	public LoginResponse login(@RequestParam String username, @RequestParam String password) {
		LoginResponse response;

		User user = null;
		try {
			user = this.userService.login(username, password);
		} catch (UserNotFoundException | WrongPasswordException e) {
			response = new LoginResponse(e);
			return response;
		}

		AuthToken token = this.authTokenService.issue(user);
		return new LoginResponse(token);
	}

	@RequestMapping(value = AuthController.REGISTER_PATH, method = RequestMethod.POST)
	public SimpleResponse register(@RequestBody User user) {
		if (user.getRole() == Role.USER) {
			this.userService.create(user);
		}
		if (!AppConstants.DEVELOP_MODE) {
			this.mailService.sendConfirmEmail(user.getEmail());
			if (user.getRole() == Role.ADMIN || (user.getRole() == Role.ROOT && !this.userService.isRootExist())) {
				this.userService.create(user);
			}
		}
		return new SimpleResponse();
	}

	@RequestMapping(value = AuthController.CONFIRM_PATH, method = RequestMethod.POST)
	public SimpleResponse confirm(@RequestParam String email) {
		// TODO browser can not open, but postman can
		this.userService.confirm(email);
		return new SimpleResponse();
	}
}
