package io.tingkai.prototype.model.exception;

/**
 * when frontend send register request and role doesn't exist, throw this
 * exception
 * 
 * @author tingkai
 */
@SuppressWarnings("serial")
public class IllegalRoleException extends Exception {

	public IllegalRoleException() {
		super();
	}

	public IllegalRoleException(String message) {
		super(message);
	}

	public IllegalRoleException(String message, Throwable t) {
		super(message, t);
	}

	public IllegalRoleException(Throwable t) {
		super(t);
	}
}
