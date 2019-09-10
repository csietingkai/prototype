package io.tingkai.prototype.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.tingkai.prototype.entity.enums.Role;
import io.tingkai.prototype.exception.IllegalRoleException;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;

	private String name;

	private String pwd;

	private String role;

	public User() {
		super();
	}

	public User(UUID id, String name, String pwd, String role) throws IllegalRoleException {
		super();
		this.id = id;
		this.name = name;
		this.pwd = pwd;
		this.setRole(role);
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) throws IllegalRoleException {
		switch (role) {
		case Role.ADMIN:
		case Role.USER:
		case Role.NONE:
			this.role = role;
			break;

		default:
			throw new IllegalRoleException();
		}
	}
}