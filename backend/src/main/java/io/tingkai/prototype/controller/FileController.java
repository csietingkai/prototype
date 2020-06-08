package io.tingkai.prototype.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.stream.Collectors;

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

import com.mongodb.client.gridfs.GridFSFindIterable;

import io.tingkai.prototype.constant.GridFSFileField;
import io.tingkai.prototype.entity.File;
import io.tingkai.prototype.model.response.SimpleResponse;
import io.tingkai.prototype.repository.FileRepository;
import io.tingkai.prototype.service.FileService;
import io.tingkai.prototype.service.RepositoryService;
import io.tingkai.prototype.util.FileUtil;

/**
 * Controller let user upload and download file to MongoDB
 * 
 * @author tingkai
 */
@RestController
@RequestMapping(value = FileController.FILE_CONTROLLER_PREFIX)
public class FileController {

	public static final String FILE_CONTROLLER_PREFIX = "/file";
	public static final String UPLOAD_PATH = "/upload";
	public static final String DOWNLOAD_PATH = "/download";
	public static final String DELETE_PATH = "/delete";
	public static final String FIND_ONE_PATH = "/findOne";
	public static final String LIST_PATH = "/list";
	public static final String HISTORY_PATH = "/history";
	public static final String REPOSITORY_LIST_PATH = "/repositories";

	@Autowired
	private FileService fileService;

	@Autowired
	private RepositoryService repositoryService;

	@RequestMapping(value = FileController.UPLOAD_PATH, method = RequestMethod.POST)
	public SimpleResponse upload(@RequestParam MultipartFile file, @RequestParam(required = false) String category)
			throws IOException {
		FileRepository fileRepository = this.repositoryService.getFileRepository(file.getOriginalFilename());
		OutputStream updaloadStream = this.fileService.getUploadStream(fileRepository.getName(),
				file.getOriginalFilename(), category);
		updaloadStream.write(file.getBytes());
		updaloadStream.close();
		return new SimpleResponse(true);
	}

	@RequestMapping(value = FileController.DOWNLOAD_PATH)
	public ResponseEntity<Resource> download(@RequestParam String filename) {
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

	@RequestMapping(value = FileController.DELETE_PATH, method = RequestMethod.DELETE)
	public SimpleResponse delete(@RequestParam String filename, @RequestParam String id) {
		String repositoryName = this.repositoryService.getFileRepository(filename).getName();
		this.fileService.delete(repositoryName, id);
		return new SimpleResponse(true);
	}

	@RequestMapping(value = FileController.FIND_ONE_PATH, method = RequestMethod.GET)
	public File findOne(@RequestParam String repositoryName, @RequestParam String id) {
		GridFSFindIterable iterable = this.fileService.findById(repositoryName, id);
		return FileUtil.convert(iterable.first());
	}

	@RequestMapping(value = FileController.LIST_PATH, method = RequestMethod.GET)
	public List<File> list(@RequestParam String repositoryName) {
		GridFSFindIterable iterable = this.fileService.find(repositoryName);
		return FileUtil.convert(iterable);
	}

	@RequestMapping(value = FileController.HISTORY_PATH, method = RequestMethod.GET)
	public List<File> history(@RequestParam String repositoryName, @RequestParam String filename) {
		GridFSFindIterable iterable = this.fileService.find(repositoryName, GridFSFileField.FILENAME, filename);
		return FileUtil.convert(iterable);
	}

	@RequestMapping(value = FileController.REPOSITORY_LIST_PATH, method = RequestMethod.GET)
	public List<String> repositories() {
		return this.repositoryService.getFileRepositories().stream().map((repository) -> {
			return repository.getName();
		}).collect(Collectors.toList());
	}
}
