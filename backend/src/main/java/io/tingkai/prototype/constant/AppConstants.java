package io.tingkai.prototype.constant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * read variables from <a href=
 * "file:../../../../../resources/application.properties">application.properties</a>
 * 
 * @author tingkai
 */
@Component
public class AppConstants {

	public static String GRID_FS_DATABASE;
	public static String ZIP_FILE_ENCODING;
	public static int FILE_IO_BUFFER_SIZE;
	public static String CONFIRM_EMAIL_LINK;
	public static boolean DEVELOP_MODE;

	@Value("${spring.data.mongodb.grid-fs-database}")
	public void setGridFsDatabase(String gridFsDatabase) {
		AppConstants.GRID_FS_DATABASE = gridFsDatabase;
	}

	@Value("${zip-file-encoding}")
	public void setZipFileEncoding(String zipFileEncoding) {
		AppConstants.ZIP_FILE_ENCODING = zipFileEncoding;
	}

	@Value("${file-io-buffer-size}")
	public void setFileIOBufferSize(int fileIOBufferSize) {
		AppConstants.FILE_IO_BUFFER_SIZE = fileIOBufferSize;
	}

	@Value("${confirm-email-link}")
	public void setConfirmEmailLink(String confirmEmailLink) {
		AppConstants.CONFIRM_EMAIL_LINK = confirmEmailLink;
	}
	
	@Value("${develop-mode}")
	public void setDevelopMode(boolean developMode) {
		AppConstants.DEVELOP_MODE = developMode;
	}
}
