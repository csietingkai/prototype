package io.tingkai.prototype.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.service.UserService;

@RestController
@RequestMapping(value = "/user")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public List<User> getAll() {
		return this.userService.getAll();
	}

	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public User get(String account) {
		return this.userService.get(account);
	}

	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public boolean insert(@RequestBody User user) {
		return this.userService.insert(user);
	}

	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public boolean update(@RequestBody User user) {
		return this.userService.update(user);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public boolean delete(@RequestBody User user) {
		return this.userService.delete(user);
	}
}
