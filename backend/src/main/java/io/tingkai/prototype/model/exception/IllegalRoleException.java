package io.tingkai.prototype.model.exception;

import io.tingkai.prototype.constant.MessageConstant;

/**
 * when frontend send register request and role doesn't exist, throw this
 * exception
 * 
 * @author tingkai
 */
@SuppressWarnings("serial")
public class IllegalRoleException extends BaseException {

	public IllegalRoleException(String roleStr) {
		super(MessageConstant.NO_THIS_ROLE, roleStr);
	}
}
