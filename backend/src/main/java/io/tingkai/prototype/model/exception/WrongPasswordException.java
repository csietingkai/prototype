package io.tingkai.prototype.model.exception;

import io.tingkai.prototype.constant.MessageConstant;

/**
 * when frontend send login request and username exist in sql database but
 * password is wrong, throw this exception
 * 
 * @author tingkai
 */
@SuppressWarnings("serial")
public class WrongPasswordException extends BaseException {

	public WrongPasswordException() {
		super(MessageConstant.WRONG_PASSWORD);
	}
}
