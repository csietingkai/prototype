package io.tingkai.prototype.model.response;

import io.tingkai.prototype.controller.AuthController;
import io.tingkai.prototype.security.AuthToken;

/**
 * response when {@link AuthController#login(String, String) login} or
 * {@link AuthController#validate(String) validate} request.
 * 
 * @author tingkai
 */
public class AuthResponse extends BaseResponse<AuthToken> {

	public AuthResponse(boolean success, AuthToken authToken, String pattern) {
		super(success, authToken, pattern);
	}

	public AuthResponse(boolean success, AuthToken authToken, String pattern, String... params) {
		super(success, authToken, pattern, params);
	}

	public AuthResponse(Exception e) {
		super(e);
	}
}
