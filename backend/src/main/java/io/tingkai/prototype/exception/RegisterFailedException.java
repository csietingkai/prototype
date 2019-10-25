package io.tingkai.prototype.exception;

@SuppressWarnings("serial")
public class RegisterFailedException extends Exception {

	public RegisterFailedException() {
		super();
	}

	public RegisterFailedException(String message) {
		super(message);
	}

	public RegisterFailedException(String message, Throwable t) {
		super(message, t);
	}

	public RegisterFailedException(Throwable t) {
		super(t);
	}
}
