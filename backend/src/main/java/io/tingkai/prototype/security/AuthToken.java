package io.tingkai.prototype.security;

import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class AuthToken implements Serializable {

	String name;

	String role;

	String tokenString;

	Date expiryDate;

	public AuthToken() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getTokenString() {
		return tokenString;
	}

	public void setTokenString(String tokenString) {
		this.tokenString = tokenString;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}
}
