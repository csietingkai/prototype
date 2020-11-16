package io.tingkai.prototype;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import io.tingkai.prototype.constant.AppConstants;
import io.tingkai.prototype.dao.UserDao;
import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.enumeration.Role;
import io.tingkai.prototype.service.UserService;
import io.tingkai.prototype.util.StringUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class AppInitializer {

	@Autowired
	private UserService userService;

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	@EventListener(ApplicationReadyEvent.class)
	public void onStarted() {
		if (!this.userService.isRootExist()) {
			this.addRoot();
		}
	}

	private void addRoot() {
		User root = new User();
		root.setName(AppConstants.INIT_ROOT_USERNAME);
		String initRootPassword = AppConstants.INIT_ROOT_PASSWORD;
		if (!Optional.ofNullable(initRootPassword).isPresent() && !StringUtil.isBlank(initRootPassword)) {
			initRootPassword = StringUtil.generateRandom(AppConstants.INIT_ROOT_PASSWORD_LENGTH);
		}
		root.setPwd(this.bCryptPasswordEncoder.encode(initRootPassword));
		root.setEmail(AppConstants.INIT_ROOT_EMAIL);
		root.setRole(Role.ROOT);
		this.userDao.save(root);
		log.info("Root Init Password is: " + initRootPassword);
	}
}
