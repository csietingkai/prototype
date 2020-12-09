package io.tingkai.prototype.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.prototype.constant.MessageConstant;
import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.enumeration.Role;
import io.tingkai.prototype.model.exception.IllegalRoleException;
import io.tingkai.prototype.model.exception.UserNotFoundException;
import io.tingkai.prototype.model.exception.WrongPasswordException;
import io.tingkai.prototype.model.response.AuthResponse;
import io.tingkai.prototype.security.AuthToken;
import io.tingkai.prototype.security.AuthTokenService;
import io.tingkai.prototype.service.MailService;
import io.tingkai.prototype.service.UserService;
import io.tingkai.prototype.util.AppUtil;

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
	public static final String VALIDATE_PATH = "/validate";

	@Autowired
	private UserService userService;

	@Autowired
	private AuthTokenService authTokenService;

	@Autowired
	private MailService mailService;

	@RequestMapping(value = AuthController.LOGIN_PATH, method = RequestMethod.POST)
	public AuthResponse login(@RequestParam String username, @RequestParam String password) throws UserNotFoundException, WrongPasswordException {
		User user = this.userService.login(username, password);
		AuthToken token = this.authTokenService.issue(user);
		return new AuthResponse(true, token, MessageConstant.LOGIN_SUCCESS, username);
	}

	@RequestMapping(value = AuthController.REGISTER_PATH, method = RequestMethod.POST)
	public AuthResponse register(@RequestBody User user, @RequestParam(required = false, defaultValue = "true") boolean sendMail) throws IllegalRoleException {
		if (user.getRole() == Role.USER) {
			this.userService.create(user);
		} else {
			throw new IllegalRoleException(user.getRole().name());
		}

		if (sendMail) {
			this.mailService.sendConfirmEmail(user.getEmail());
		}

		return new AuthResponse(true, null, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = AuthController.CONFIRM_PATH, method = RequestMethod.POST)
	public AuthResponse confirm(@RequestParam String email) {
		// TODO browser can not open, but postman can
		this.userService.confirm(email);
		return new AuthResponse(true, null, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = AuthController.VALIDATE_PATH, method = RequestMethod.GET)
	public AuthResponse validate(@RequestParam String tokenString) {
		AuthToken token = this.authTokenService.validate(tokenString);
		if (AppUtil.isPresent(token)) {
			return new AuthResponse(true, token, MessageConstant.LOGIN_SUCCESS);
		} else {
			return new AuthResponse(false, null, MessageConstant.AUTH_TOKEN_EXPIRE);
		}
	}
}
