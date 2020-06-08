package io.tingkai.prototype.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.tingkai.prototype.constant.DatabaseContants;
import lombok.Data;

/**
 * Entity for sql database table 'item'
 * 
 * @author tingkai
 */
@Entity
@Data
@Table(name = DatabaseContants.TABLE_ITEM)
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	private String name;
	private Integer price;
}
