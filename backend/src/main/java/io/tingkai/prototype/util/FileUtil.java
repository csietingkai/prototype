package io.tingkai.prototype.util;

import org.apache.tika.Tika;

import com.mongodb.client.gridfs.model.GridFSFile;

import io.tingkai.prototype.entity.File;

public class FileUtil {

	public static String getMimeType(String filename) {
		Tika tika = new Tika();
		return tika.detect(filename); 
	}

	@SuppressWarnings("deprecation")
	public static File convert(GridFSFile gridfsFile) {
		File file = new File();
		file.setId(gridfsFile.getObjectId().toString());
		file.setFilename(gridfsFile.getFilename());
		file.setSize(gridfsFile.getLength());
		file.setUploadDate(gridfsFile.getUploadDate());
		file.setMd5(gridfsFile.getMD5());
		file.setMetadata(gridfsFile.getMetadata());
		return file;
	}
}
