package io.tingkai.prototype.repository;

import java.util.Arrays;

import org.springframework.stereotype.Component;

import io.tingkai.prototype.enumeration.FileType;

/**
 * repository store sound file, eg: mp3, flac, m4a, aac, wav
 * 
 * @author tingkai
 */
@Component
public class SoundRepository extends FileRepository {

	public SoundRepository() {
		super(Arrays.asList(FileType.MP3, FileType.FLAC, FileType.M4A, FileType.AAC, FileType.WAV));
	}
}
