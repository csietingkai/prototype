package io.tingkai.prototype.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.tingkai.prototype.dao.UserDao;
import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.exception.UserNotFoundException;
import io.tingkai.prototype.exception.WrongPasswordException;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	public User login(String name, String pwd) throws UserNotFoundException, WrongPasswordException {
		Optional<User> userOptional = this.userDao.findByName(name);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			if (this.bCryptPasswordEncoder.matches(pwd, user.getPwd())) {
				return user;
			}
			throw new WrongPasswordException();
		} else {
			throw new UserNotFoundException();
		}
	}

	public void create(User user) {
		user.setPwd(this.bCryptPasswordEncoder.encode(user.getPwd()));
		this.userDao.save(user);
	}
}
