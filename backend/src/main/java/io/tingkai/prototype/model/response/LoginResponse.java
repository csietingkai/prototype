package io.tingkai.prototype.model.response;

import io.tingkai.prototype.security.AuthToken;

public class LoginResponse extends SimpleResponse {

	private AuthToken authToken;

	public LoginResponse() {
		super();
	}

	public LoginResponse(AuthToken authToken) {
		super();
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
