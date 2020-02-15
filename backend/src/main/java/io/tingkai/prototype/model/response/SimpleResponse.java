package io.tingkai.prototype.model.response;

import io.tingkai.prototype.constant.MessageConstant;

/**
 * simple response with success and message.
 * 
 * @author tingkai
 */
public class SimpleResponse {

	private boolean isSuccess;

	private String message;

	public SimpleResponse() {
		this(true);
	}

	public SimpleResponse(boolean isSuccess) {
		this.isSuccess = isSuccess;
		if (this.isSuccess) {
			this.message = MessageConstant.SIMPLE_RESPONSE_SUCCESS_MSG;
		} else {
			this.message = MessageConstant.SIMPLE_RESPONSE_FAIL_MSG;
		}
	}

	public SimpleResponse(boolean isSuccess, String message) {
		this.isSuccess = isSuccess;
		this.message = message;
	}

	public SimpleResponse(Exception e) {
		this.isSuccess = false;
		this.message = e.getMessage();
		e.printStackTrace();
	}

	public boolean isSuccess() {
		return this.isSuccess;
	}

	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
