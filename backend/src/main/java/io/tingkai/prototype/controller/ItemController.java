package io.tingkai.prototype.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.prototype.entity.Item;
import io.tingkai.prototype.service.ItemService;

@RestController
@RequestMapping(value = "/item")
public class ItemController {

	public static final String GET_ALL_PATH = "/getAll";
	public static final String GET_PATH = "/get";
	public static final String INSERT_PATH = "/insert";
	public static final String UPDATE_PATH = "/update";
	public static final String DELETE_PATH = "/delete";

	@Autowired
	private ItemService itemService;

	@RequestMapping(value = ItemController.GET_ALL_PATH, method = RequestMethod.GET)
	public List<Item> getAll() {
		return this.itemService.getAll();
	}

	@RequestMapping(value = ItemController.GET_PATH, params = "id", method = RequestMethod.GET)
	public Item get(@RequestParam UUID id) {
		return this.itemService.get(id);
	}

	@RequestMapping(value = ItemController.GET_PATH, params = "name", method = RequestMethod.GET)
	public Item get(@RequestParam String name) {
		return this.itemService.get(name);
	}

	@RequestMapping(value = ItemController.INSERT_PATH, method = RequestMethod.PUT)
	public boolean insert(@RequestBody Item item) {
		return this.itemService.insert(item);
	}

	@RequestMapping(value = ItemController.UPDATE_PATH, method = RequestMethod.POST)
	public boolean update(@RequestBody Item item) {
		return this.itemService.update(item);
	}

	@RequestMapping(value = ItemController.DELETE_PATH, params = "id", method = RequestMethod.DELETE)
	public boolean delete(@RequestParam UUID id) {
		return this.itemService.delete(id);
	}

	@RequestMapping(value = ItemController.DELETE_PATH, method = RequestMethod.DELETE)
	public boolean delete(@RequestBody Item item) {
		return this.itemService.delete(item);
	}
}
