package io.tingkai.prototype.model.response;

import io.tingkai.prototype.constant.MessageConstant;
import io.tingkai.prototype.controller.AuthController;
import io.tingkai.prototype.security.AuthToken;

/**
 * response when {@link AuthController#login(String, String) login} or {@link AuthController#validate(String) validate} request.
 * 
 * @author tingkai
 */
public class LoginResponse extends SimpleResponse {

	private AuthToken authToken;

	public LoginResponse() {
		super(false);
	}

	public LoginResponse(AuthToken authToken) {
		super(true, MessageConstant.INFO_MSG_LOGIN_SUCCESS);
		this.authToken = authToken;
	}

	public LoginResponse(Exception e) {
		super(e);
	}

	public AuthToken getAuthToken() {
		return this.authToken;
	}

	public void setAuthToken(AuthToken authToken) {
		this.authToken = authToken;
	}
}
