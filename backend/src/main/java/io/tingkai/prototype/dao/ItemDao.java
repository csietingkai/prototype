package io.tingkai.prototype.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.tingkai.prototype.entity.Item;

@Repository
public interface ItemDao extends CrudRepository<Item, UUID> {

	public Optional<Item> findByName(String name);
}
