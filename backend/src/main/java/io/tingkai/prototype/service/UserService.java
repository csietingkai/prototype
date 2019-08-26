package io.tingkai.prototype.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.tingkai.prototype.dao.UserDao;
import io.tingkai.prototype.entity.User;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;

	public User get(UUID id) {
		Optional<User> user = this.userDao.findById(id);
		if (user.isPresent()) {
			return user.get();
		} else {
			return null;
		}
	}

	public List<User> getAll() {
		Iterable<User> userIterable = this.userDao.findAll();

		List<User> userList = new ArrayList<User>();

		userIterable.forEach(userList::add);

		return userList;
	}

	public boolean insert(User user) {
		return this.update(user);
	}

	public boolean update(User user) {
		try {
			this.userDao.save(user);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean delete(User user) {
		try {
			this.userDao.delete(user);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean deleteById(UUID id) {
		try {
			this.userDao.deleteById(id);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean deleteAll() {
		try {
			this.userDao.deleteAll();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
