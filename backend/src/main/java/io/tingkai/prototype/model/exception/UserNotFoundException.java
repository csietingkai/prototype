package io.tingkai.prototype.model.exception;

import io.tingkai.prototype.constant.MessageConstant;

/**
 * when frontend send login request and username doesn't exist in sql database,
 * throw this exception
 * 
 * @author tingkai
 */
@SuppressWarnings("serial")
public class UserNotFoundException extends BaseException {

	public UserNotFoundException(String username) {
		super(MessageConstant.USER_NOT_FOUND, username);
	}
}
