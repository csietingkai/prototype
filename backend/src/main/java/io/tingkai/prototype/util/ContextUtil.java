package io.tingkai.prototype.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import io.tingkai.prototype.security.AuthTokenAuthentication;

public class ContextUtil {

	public static String getUserName() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth instanceof AuthTokenAuthentication) {
			AuthTokenAuthentication authToken = (AuthTokenAuthentication) auth;
			return authToken.getPrincipal().toString();
		}
		return "";
	}
}
