package io.tingkai.prototype.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import io.tingkai.prototype.entity.User;

public interface UserDao extends CrudRepository<User, UUID> {

}
