package io.tingkai.prototype.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.prototype.entity.Item;
import io.tingkai.prototype.service.ItemService;

@RestController
@RequestMapping(value = "/item")
public class ItemController {

	@Autowired
	private ItemService itemService;

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public List<Item> getAll() {
		return this.itemService.getAll();
	}
}
