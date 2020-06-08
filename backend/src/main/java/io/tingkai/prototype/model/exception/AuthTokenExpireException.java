package io.tingkai.prototype.model.exception;

import io.tingkai.prototype.constant.MessageConstant;

/**
 * when frontend send register request and role doesn't exist, throw this
 * exception
 * 
 * @author tingkai
 */
@SuppressWarnings("serial")
public class AuthTokenExpireException extends BaseException {

	public AuthTokenExpireException() {
		super(MessageConstant.AUTH_TOKEN_EXPIRE);
	}
}
