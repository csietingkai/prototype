package io.tingkai.prototype.model.response;

import io.tingkai.prototype.constant.MessageConstant;

/**
 * simple response with success and message.
 * 
 * @author tingkai
 */
public class SimpleResponse extends BaseResponse<Void> {

	public SimpleResponse(boolean success) {
		super(success, null, (success ? MessageConstant.SUCCESS : MessageConstant.FAIL));
	}

	public SimpleResponse(Exception e) {
		super(e);
	}
}
