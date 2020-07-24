package io.tingkai.prototype.enumeration;

import java.util.Optional;

/**
 * File types aka file extension
 * 
 * @author tingkai
 */
public enum FileType {
	PNG("png"), JPEG("jpeg"), JPG("jpg"), GIF("gif"), MP4("mp4"), MKV("mkv"), MP3("mp3"), FLAC("flac"), M4A("m4a"), AAC("aac"), WAV("wav"), DOC("doc"), DOCX("docx"), XLS("xls"), XLSX("xlsx"), PPT("ppt"), PPTX("pptx"), PDF("pdf"), ZIP("zip"), RAR("rar"), ZIP7("7z"), TARGZ("tar.gz"), OTHER("");

	String value;
	String endString;

	private FileType(String value) {
		this.value = value;
		if (Optional.ofNullable(value).isPresent()) {
			this.endString = "." + value;
		}
	}

	public String getValue() {
		return value;
	}

	public String getEndWith() {
		return endString;
	}

	public static FileType convertByString(String value) {
		if (Optional.ofNullable(value).isPresent()) {
			for (FileType type : FileType.values()) {
				if (value.equals(type.getValue())) {
					return type;
				}
			}
		}
		return FileType.OTHER;
	}

	public static FileType getTypeByFilename(String filename) {
		if (Optional.ofNullable(filename).isPresent()) {
			for (FileType type : FileType.values()) {
				if (filename.endsWith(type.getEndWith())) {
					return type;
				}
			}
		}
		return FileType.OTHER;
	}
}
