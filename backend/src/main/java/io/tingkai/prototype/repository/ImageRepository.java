package io.tingkai.prototype.repository;

import java.util.Arrays;

import org.springframework.stereotype.Component;

import io.tingkai.prototype.enumeration.FileType;

/**
 * repository store image file, eg: png, jpeg, jpg, gif
 * 
 * @author tingkai
 */
@Component
public class ImageRepository extends FileRepository {

	public ImageRepository() {
		super(Arrays.asList(FileType.PNG, FileType.JPEG, FileType.JPG, FileType.GIF));
	}
}
