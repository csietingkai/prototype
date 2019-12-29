package io.tingkai.prototype.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import io.tingkai.prototype.entity.User;

/**
 * CrudRepository for sql database table 'users'
 * 
 * @author tingkai
 */
public interface UserDao extends CrudRepository<User, UUID> {

	Optional<User> findByName(String name);
}
