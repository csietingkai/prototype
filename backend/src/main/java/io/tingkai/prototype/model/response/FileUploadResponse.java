package io.tingkai.prototype.model.response;

import java.text.MessageFormat;

import io.tingkai.prototype.constant.MessageConstant;

/**
 * simple response with success and message.
 * 
 * @author tingkai
 */
public class FileUploadResponse extends BaseResponse<Void> {

	public FileUploadResponse(boolean isSuccess, String... messageParams) {
		super(isSuccess, MessageFormat.format(isSuccess ? MessageConstant.FILE_UPLOAD_SUCCESS : MessageConstant.FILE_UPLOAD_FAIL, (Object[]) messageParams), null);
	}
}
