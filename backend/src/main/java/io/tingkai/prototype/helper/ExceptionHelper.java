package io.tingkai.prototype.helper;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import io.tingkai.prototype.constant.AppConstants;
import io.tingkai.prototype.model.exception.AuthTokenExpireException;
import io.tingkai.prototype.model.exception.IllegalRoleException;
import io.tingkai.prototype.model.exception.UserNotFoundException;
import io.tingkai.prototype.model.exception.WrongPasswordException;
import io.tingkai.prototype.model.response.BaseResponse;
import io.tingkai.prototype.model.response.LoginResponse;
import io.tingkai.prototype.model.response.SimpleResponse;
import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class ExceptionHelper {

	@ExceptionHandler(AuthTokenExpireException.class)
	public ResponseEntity<BaseResponse<?>> handleAuthTokenExpireException(Exception e, HttpServletResponse resp) {
		if (AppConstants.DEBUG_MODE) {
			log.debug(e.getMessage(), e);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(e));
	}

	@ExceptionHandler(IllegalRoleException.class)
	public ResponseEntity<BaseResponse<?>> handleIllegalRoleException(Exception e, HttpServletResponse resp) {
		if (AppConstants.DEBUG_MODE) {
			log.debug(e.getMessage(), e);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(e));
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<BaseResponse<?>> handleUserNotFoundException(Exception e, HttpServletResponse resp) {
		if (AppConstants.DEBUG_MODE) {
			log.debug(e.getMessage(), e);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(e));
	}

	@ExceptionHandler(WrongPasswordException.class)
	public ResponseEntity<BaseResponse<?>> handleWrongPasswordException(Exception e, HttpServletResponse resp) {
		if (AppConstants.DEBUG_MODE) {
			log.debug(e.getMessage(), e);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(e));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<BaseResponse<?>> handleException(Exception e, HttpServletResponse resp) {
		if (AppConstants.DEBUG_MODE) {
			log.debug(e.getMessage(), e);
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new SimpleResponse(e));
	}
}
