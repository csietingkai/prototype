package io.tingkai.prototype.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.tingkai.prototype.constant.MessageConstant;
import io.tingkai.prototype.dao.UserDao;
import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.enumeration.Role;
import io.tingkai.prototype.exception.UserNotFoundException;
import io.tingkai.prototype.exception.WrongPasswordException;
import io.tingkai.prototype.util.ContextUtil;

/**
 * provide method for upload, download, find, delete files stored in sql
 * database table 'users'
 * 
 * @author tingkai
 */
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
			throw new WrongPasswordException(MessageConstant.ERROR_MSG_WRONG_PASSWORD);
		} else {
			throw new UserNotFoundException(MessageConstant.ERROR_MSG_USER_NOT_FOUND);
		}
	}

	public void create(User user) {
		this.create(user, true);
	}

	public void create(User user, boolean normalRegister) {
		user.setPwd(this.bCryptPasswordEncoder.encode(user.getPwd()));
		if (normalRegister) {
			user.setRole(Role.USER);
		}
		this.userDao.save(user);
	}

	public void confirm(String email) {
		Optional<User> optionalUser = this.userDao.findByEmail(email);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			user.setConfirm(true);
			this.userDao.save(user);
		}
	}

	public void setUserAsAdmin(User userToBeAdmin) {
		if (isCurrentUserRoot()) {
			userToBeAdmin.setRole(Role.ADMIN);
			this.userDao.save(userToBeAdmin);
		}
	}

	public boolean isCurrentUserRoot() {
		Optional<User> loginUser = getCurrentLoginUser();
		return loginUser.isPresent() && loginUser.get().getRole() == Role.ROOT;
	}

	public boolean isCurrentUserConfirm() {
		Optional<User> loginUser = getCurrentLoginUser();
		return loginUser.isPresent() && loginUser.get().getRole() == Role.ROOT;
	}

	public boolean isRootExist() {
		return this.userDao.findByRole(Role.ROOT).isPresent();
	}

	private Optional<User> getCurrentLoginUser() {
		String loginUsername = ContextUtil.getUserName();
		return this.userDao.findByName(loginUsername);
	}
}
