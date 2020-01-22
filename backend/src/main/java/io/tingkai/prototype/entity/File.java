package io.tingkai.prototype.entity;

import java.util.Date;

import org.bson.Document;

public class File {

	private String id;
	private String filename;
	private long size;
	private Date uploadDate;
	private String md5;
	private Document metadata;

	public File() { }

	public File(String id, String filename, long size, Date uploadDate, String md5, Document metadata) {
		super();
		this.id = id;
		this.filename = filename;
		this.size = size;
		this.uploadDate = uploadDate;
		this.md5 = md5;
		this.metadata = metadata;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFilename() {
		return this.filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public long getSize() {
		return this.size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public Date getUploadDate() {
		return this.uploadDate;
	}

	public void setUploadDate(Date uploadDate) {
		this.uploadDate = uploadDate;
	}

	public String getMd5() {
		return this.md5;
	}

	public void setMd5(String md5) {
		this.md5 = md5;
	}

	public Document getMetadata() {
		return this.metadata;
	}

	public void setMetadata(Document metadata) {
		this.metadata = metadata;
	}
}
