package io.tingkai.prototype;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import io.tingkai.prototype.constant.AppConstants;
import io.tingkai.prototype.service.UserService;
import io.tingkai.prototype.util.StringUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class AppInitializer {

	@Autowired
	private UserService userService;

	@EventListener(ApplicationReadyEvent.class)
	public void onStarted() {
		if (!this.userService.isRootExist()) {
			String initRootPassword = AppConstants.INIT_ROOT_PASSWORD;
			if (!Optional.ofNullable(initRootPassword).isPresent() && !StringUtil.isBlank(initRootPassword)) {
				initRootPassword = StringUtil.generateRandom(AppConstants.INIT_ROOT_PASSWORD_LENGTH);
			}
			log.info("Root Init Password is: " + initRootPassword);
			this.userService.createRoot(initRootPassword);
		}
	}
}
