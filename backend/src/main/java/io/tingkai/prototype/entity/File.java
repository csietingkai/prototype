package io.tingkai.prototype.entity;

import java.util.Date;

import org.bson.Document;

import lombok.Data;

@Data
public class File {
	private String id;
	private String filename;
	private long size;
	private Date uploadDate;
	private String md5;
	private Document metadata;
}
