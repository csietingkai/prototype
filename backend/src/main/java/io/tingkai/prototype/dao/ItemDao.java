package io.tingkai.prototype.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.tingkai.prototype.entity.Item;

/**
 * JpaRepository for sql database table 'item'
 * 
 * @author tingkai
 */
@Repository
public interface ItemDao extends JpaRepository<Item, UUID> {

	public Optional<Item> findByName(String name);
}
