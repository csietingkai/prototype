package io.tingkai.prototype.security;

import java.io.Serializable;
import java.util.Date;

import io.tingkai.prototype.enumeration.Role;
import lombok.Data;

/**
 * AuthToken include user info and token string.
 * 
 * @author tingkai
 */
@SuppressWarnings("serial")
@Data
public class AuthToken implements Serializable {

	private String name;
	private Role role;
	private String tokenString;
	private Date expiryDate;
}
