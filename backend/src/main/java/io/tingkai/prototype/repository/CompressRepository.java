package io.tingkai.prototype.repository;

import java.util.Arrays;

import org.springframework.stereotype.Component;

import io.tingkai.prototype.enumeration.FileType;

/**
 * repository store compressed file, eg: zip, rar, 7z, tar.gz
 * 
 * @author tingkai
 */
@Component
public class CompressRepository extends FileRepository {

	public CompressRepository() {
		super(Arrays.asList(FileType.ZIP, FileType.RAR, FileType.ZIP7, FileType.TARGZ));
	}
}
