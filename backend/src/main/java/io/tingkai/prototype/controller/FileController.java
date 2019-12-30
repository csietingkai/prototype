package io.tingkai.prototype.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.tingkai.prototype.repository.FileRepository;
import io.tingkai.prototype.service.FileService;
import io.tingkai.prototype.service.RepositoryService;

/**
 * Controller let user upload and download file to MongoDB
 * 
 * @author tingkai
 */
@RestController
@RequestMapping(value = "/file")
public class FileController {

	public static final String UPLOAD_PATH = "/upload";
	public static final String DOWNLOAD_PATH = "/download";

	@Autowired
	private FileService fileService;

	@Autowired
	private RepositoryService repositoryService;

	@RequestMapping(value = FileController.UPLOAD_PATH, method = RequestMethod.POST)
	public void upload(@RequestParam MultipartFile file) throws IOException {
		FileRepository fileRepository = this.repositoryService.getFileRepository(file.getOriginalFilename());
		OutputStream updaloadStream = this.fileService.getUploadStream(fileRepository.getName(),
				file.getOriginalFilename());
		updaloadStream.write(file.getBytes());
		updaloadStream.close();
	}

	@RequestMapping(value = FileController.DOWNLOAD_PATH)
	public ResponseEntity<Resource> download(@RequestParam String id, @RequestParam String filename) {
		FileRepository fileRepository = this.repositoryService.getFileRepository(filename);
		InputStream downloadStream = this.fileService.getDownloadStream(fileRepository.getName(), filename);
		InputStreamResource resource = new InputStreamResource(downloadStream);
		HttpHeaders header = new HttpHeaders();
		header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);
		header.add(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate");
		header.add(HttpHeaders.PRAGMA, "no-cache");
		header.add(HttpHeaders.EXPIRES, "0");
		return ResponseEntity.ok().headers(header).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
	}
}
