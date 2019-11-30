package io.tingkai.prototype.exception;

@SuppressWarnings("serial")
public class WrongPasswordExpection extends Exception {

	public WrongPasswordExpection() {
		super();
	}

	public WrongPasswordExpection(String message) {
		super(message);
	}

	public WrongPasswordExpection(String message, Throwable t) {
		super(message, t);
	}

	public WrongPasswordExpection(Throwable t) {
		super(t);
	}
}
