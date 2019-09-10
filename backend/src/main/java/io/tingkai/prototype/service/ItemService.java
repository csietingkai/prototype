package io.tingkai.prototype.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.tingkai.prototype.dao.ItemDao;
import io.tingkai.prototype.entity.Item;

@Service
public class ItemService {

	@Autowired
	private ItemDao itemDao;

	public List<Item> getAll() {
		List<Item> items = new ArrayList<Item>();
		Iterable<Item> itemIterable = this.itemDao.findAll();
		itemIterable.forEach(items::add);
		return items;
	}

	public Item get(UUID id) {
		Optional<Item> itemOptional = this.itemDao.findById(id);
		if (itemOptional.isPresent()) {
			return itemOptional.get();
		} else {
			return null;
		}
	}

	public Item get(String name) {
		Optional<Item> itemOptional = this.itemDao.findByName(name);
		if (itemOptional.isPresent()) {
			return itemOptional.get();
		} else {
			return null;
		}
	}

	public boolean insert(Item item) {
		return this.update(item);
	}

	public boolean update(Item item) {
		try {
			this.itemDao.save(item);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean delete(Item item) {
		try {
			this.itemDao.delete(item);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
