package io.tingkai.prototype.model.response;

import io.tingkai.prototype.controller.AuthController;
import io.tingkai.prototype.security.AuthToken;

/**
 * response when {@link AuthController#login(String, String) login} or
 * {@link AuthController#validate(String) validate} request.
 * 
 * @author tingkai
 */
public class LoginResponse extends BaseResponse<AuthToken> {

	public LoginResponse(boolean isSuccess, String message, AuthToken authToken) {
		super(isSuccess, message, authToken);
	}

	public LoginResponse(Exception e) {
		super(e);
	}
}
