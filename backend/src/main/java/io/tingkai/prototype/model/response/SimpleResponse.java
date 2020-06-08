package io.tingkai.prototype.model.response;

import io.tingkai.prototype.constant.MessageConstant;

/**
 * simple response with success and message.
 * 
 * @author tingkai
 */
public class SimpleResponse extends BaseResponse<Void> {

	public SimpleResponse(boolean isSuccess) {
		super(isSuccess,
				(isSuccess ? MessageConstant.SUCCESS : MessageConstant.FAIL),
				null);
	}
}
