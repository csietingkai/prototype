package io.tingkai.prototype.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.tingkai.prototype.dao.UserDao;
import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.exception.UserNotFoundException;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	public User findByNameAndPwd(String name, String pwd) throws UserNotFoundException {
		Optional<User> userOptional = this.userDao.findByNameAndPwd(name, pwd);
		if (userOptional.isPresent()) {
			return userOptional.get();
		} else {
			throw new UserNotFoundException();
		}
	}

	public void saveUser(User user) {
		user.setPwd(this.bCryptPasswordEncoder.encode(user.getPwd()));
		this.userDao.save(user);
	}
}
