package io.tingkai.prototype.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.tingkai.prototype.constant.DatabaseContants;
import io.tingkai.prototype.enumeration.Role;
import lombok.Data;

/**
 * Entity for sql database table 'users'
 * 
 * @author tingkai
 */
@Entity
@Data
@Table(name = DatabaseContants.TABLE_USER)
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	@Column(unique = true)
	private String name;
	@Column(unique = true)
	private String email;
	private String pwd;
	@Enumerated(EnumType.STRING)
	private Role role;
	private boolean confirm;
}