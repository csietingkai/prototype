package io.tingkai.prototype.security;

import java.io.Serializable;
import java.util.Date;

import io.tingkai.prototype.enumeration.Role;

/**
 * AuthToken include user info and token string.
 * 
 * @author tingkai
 */
@SuppressWarnings("serial")
public class AuthToken implements Serializable {

	private String name;

	private Role role;

	private String tokenString;

	private Date expiryDate;

	public AuthToken() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
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
