package io.tingkai.prototype.service;

import java.io.InputStream;
import java.io.OutputStream;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.GridFSFindIterable;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import com.mongodb.client.model.Filters;

import io.tingkai.prototype.constant.AppConstants;
import io.tingkai.prototype.constant.CodeConstants;
import io.tingkai.prototype.repository.FileRepository;
import io.tingkai.prototype.util.ContextUtil;

/**
 * provide method for upload, download, find, delete files stored in
 * {@link FileRepository}
 * 
 * @author tingkai
 */
@Service
public class FileService {

	@Autowired
	private MongoClient mongoClient;

	public OutputStream getUploadStream(String repositoryName, String sourceFileName) {
		GridFSUploadOptions options = new GridFSUploadOptions();
		options.metadata(new Document(CodeConstants.METADATA_UPLOADER_KEY, ContextUtil.getUserName()));
		return this.getBucket(repositoryName).openUploadStream(sourceFileName, options);
	}

	public InputStream getDownloadStream(String repositoryName, String sourceFileName) {
		return this.getBucket(repositoryName).openDownloadStream(sourceFileName);
	}

	public void delete(String repositoryName, String id) {
		this.getBucket(repositoryName).delete(new ObjectId(id));
	}

	public GridFSFindIterable find(String repositoryName) {
		return this.getBucket(repositoryName).find();
	}

	public GridFSFindIterable find(String repositoryName, String id) {
		return this.getBucket(repositoryName).find(Filters.eq("_id", id));
	}

	public GridFSFindIterable findByUploader(String repositoryName, String uploader) {
		return this.getBucket(repositoryName).find(Filters.eq("metadata." + CodeConstants.METADATA_UPLOADER_KEY, uploader));
	}

	protected GridFSBucket getBucket(String repositoryName) {
		MongoDatabase database = this.mongoClient.getDatabase(AppConstants.GRID_FS_DATABASE);
		return GridFSBuckets.create(database, repositoryName);
	}
}
