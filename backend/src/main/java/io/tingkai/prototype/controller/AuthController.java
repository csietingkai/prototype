package io.tingkai.prototype.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.prototype.security.AuthToken;

@RestController
public class AuthController {

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public AuthToken login(@RequestParam String username, @RequestParam String password) {
		return null;
	}
}
