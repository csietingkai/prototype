package io.tingkai.prototype.repository;

import java.util.Arrays;

import org.springframework.stereotype.Component;

import io.tingkai.prototype.enumeration.FileType;

/**
 * repository store other file aka file which extension doesn't define in
 * {@link FileType}
 * 
 * @author tingkai
 */
@Component
public class OtherRepository extends FileRepository {

	public OtherRepository() {
		super(Arrays.asList(FileType.OTHER));
	}
}
