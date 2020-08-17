package io.tingkai.prototype.model.response;

import java.text.MessageFormat;

import lombok.Data;

/**
 * base response
 * 
 * @author tingkai
 */
@Data
public abstract class BaseResponse<T> {

	private boolean isSuccess;

	private T data;

	private String message;

	public BaseResponse(Exception e) {
		this(false, null, e.getMessage());
	}

	public BaseResponse(boolean isSuccess, T data, String message) {
		super();
		this.isSuccess = isSuccess;
		this.data = data;
		this.message = message;
	}

	public BaseResponse(boolean isSuccess, T data, String pattern, String... params) {
		super();
		this.isSuccess = isSuccess;
		this.data = data;
		this.message = MessageFormat.format(pattern, (Object[]) params);
	}
}
