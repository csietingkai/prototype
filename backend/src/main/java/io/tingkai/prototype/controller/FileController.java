package io.tingkai.prototype.controller;

import java.io.IOException;
import java.io.OutputStream;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.springframework.beans.factory.annotation.Autowired;
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

	@RequestMapping(value = UPLOAD_PATH, method = RequestMethod.POST)
	public void uploadImage(@RequestParam MultipartFile file) throws IOException {
		FileRepository fileRepository = this.repositoryService.getFileRepository(file.getOriginalFilename());
		OutputStream updaloadStream = this.fileService.getUploadStream(fileRepository.getName(),
				file.getOriginalFilename());
		updaloadStream.write(file.getBytes());
		updaloadStream.close();
	}

	@RequestMapping()
	public ResponseEntity<Resource> downloadImage(@RequestParam String id) {
//		Path path = Paths.get(file.getAbsolutePath());
//		ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
//		return ResponseEntity.ok().headers(headers).contentLength(file.length())
//				.contentType(MediaType.parseMediaType("application/octet-stream")).body(resource);
		return null;
	}
}
