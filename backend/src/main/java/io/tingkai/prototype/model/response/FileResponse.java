package io.tingkai.prototype.model.response;

import io.tingkai.prototype.controller.FileController;

/**
 * response when all request in {@link FileController}.
 * 
 * @author tingkai
 */
public class FileResponse<T> extends BaseResponse<T> {

	public FileResponse(boolean isSuccess, T t, String pattern) {
		super(isSuccess, t, pattern);
	}

	public FileResponse(boolean isSuccess, T t, String pattern, String... params) {
		super(isSuccess, t, pattern, params);
	}

	public FileResponse(Exception e) {
		super(e);
	}

}
