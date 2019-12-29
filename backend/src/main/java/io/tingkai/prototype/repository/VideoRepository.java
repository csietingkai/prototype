package io.tingkai.prototype.repository;

import java.util.Arrays;

import org.springframework.stereotype.Component;

import io.tingkai.prototype.enumeration.FileType;

/**
 * repository store video file, eg: mp4, mkv
 * 
 * @author tingkai
 */
@Component
public class VideoRepository extends FileRepository {

	public VideoRepository() {
		super(Arrays.asList(FileType.MP4, FileType.MKV));
	}
}
