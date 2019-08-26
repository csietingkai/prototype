package io.tingkai.prototype.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping("/user/getAll")
	public List<User> getAll() {
		return this.userService.getAll();
	}
}
