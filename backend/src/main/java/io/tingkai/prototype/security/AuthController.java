package io.tingkai.prototype.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

	@Autowired
	private UsernamePasswordAuthenticationService usernamePasswordAuthenticationService;

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public AuthToken login(@RequestParam String username, @RequestParam String password) {
		return this.usernamePasswordAuthenticationService.authenticate(username, password);
	}
}
