package io.tingkai.prototype.model.response;

/**
 * base response
 * 
 * @author tingkai
 */
public abstract class BaseResponse<T> {

	private boolean isSuccess;

	private String message;

	private T data;

	public BaseResponse(Exception e) {
		this(false, e.getMessage(), null);
	}

	public BaseResponse(boolean isSuccess, String message, T data) {
		super();
		this.isSuccess = isSuccess;
		this.message = message;
		this.data = data;
	}

	public boolean isSuccess() {
		return isSuccess;
	}

	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
}
