package io.tingkai.prototype.exception;

/**
 * when frontend send login request and username doesn't exist in sql database,
 * throw this exception
 * 
 * @author tingkai
 */
@SuppressWarnings("serial")
public class UserNotFoundException extends Exception {

	public UserNotFoundException() {
		super();
	}

	public UserNotFoundException(String message) {
		super(message);
	}

	public UserNotFoundException(String message, Throwable t) {
		super(message, t);
	}

	public UserNotFoundException(Throwable t) {
		super(t);
	}
}
