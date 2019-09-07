package io.tingkai.prototype.entity.enums;

public enum Role {

	ADMIN("ADMIN"), USER("USER"), NONE("NONE");

	private String value;

	private Role(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
