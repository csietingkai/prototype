package io.tingkai.prototype.model.exception;

import io.tingkai.prototype.constant.MessageConstant;

/**
 * when frontend send register request and role doesn't exist, throw this
 * exception
 * 
 * @author tingkai
 */
public class AuthTokenExpireException extends BaseException {

	private static final long serialVersionUID = 7390528937436214867L;

	public AuthTokenExpireException() {
		super(MessageConstant.AUTH_TOKEN_EXPIRE);
	}
}
