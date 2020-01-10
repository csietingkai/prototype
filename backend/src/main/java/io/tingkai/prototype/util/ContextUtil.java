package io.tingkai.prototype.util;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import io.tingkai.prototype.security.AuthTokenAuthentication;

public class ContextUtil {

	public static String getUserName() {
		AuthTokenAuthentication authToken = getAuthToken();
		if (Optional.ofNullable(authToken).isPresent()) {
			return authToken.getPrincipal().toString();
		}
		return "";
	}

	public static String getTokenString() {
		AuthTokenAuthentication authToken = getAuthToken();
		if (Optional.ofNullable(authToken).isPresent()) {
			return authToken.getCredentials().toString();
		}
		return "";
	}

	public static AuthTokenAuthentication getAuthToken() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth instanceof AuthTokenAuthentication) {
			return (AuthTokenAuthentication) auth;
		}
		return null;
	}
}
