package io.tingkai.prototype.exception;

/**
 * when frontend send login request and username exist in sql database but
 * password is wrong, throw this exception
 * 
 * @author tingkai
 */
@SuppressWarnings("serial")
public class WrongPasswordException extends Exception {

	public WrongPasswordException() {
		super();
	}

	public WrongPasswordException(String message) {
		super(message);
	}

	public WrongPasswordException(String message, Throwable t) {
		super(message, t);
	}

	public WrongPasswordException(Throwable t) {
		super(t);
	}
}
