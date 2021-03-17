package io.tingkai.prototype.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.tingkai.prototype.entity.User;
import io.tingkai.prototype.enumeration.Role;

/**
 * JpaRepository for sql database table 'users'
 * 
 * @author tingkai
 */
@Repository
public interface UserDao extends JpaRepository<User, UUID> {

	public Optional<User> findByName(String name);

	public Optional<User> findByEmail(String email);

	public Iterable<User> findByRole(Role role);
}
