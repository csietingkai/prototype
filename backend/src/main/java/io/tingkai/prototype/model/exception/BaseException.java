package io.tingkai.prototype.model.exception;

import java.text.MessageFormat;

@SuppressWarnings("serial")
public class BaseException extends Exception {

	public BaseException(String pattern, Object... params) {
		super(MessageFormat.format(pattern, params));
	}
}
