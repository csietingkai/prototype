package io.tingkai.prototype.service;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLConnection;
import java.util.Optional;

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
import io.tingkai.prototype.constant.GridFSFileField;
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
		return getUploadStream(repositoryName, sourceFileName, null);
	}

	public OutputStream getUploadStream(String repositoryName, String sourceFileName, String category) {
		Document metadata = new Document();
		metadata.append(GridFSFileField.METADATA_UPLOADER_KEY, ContextUtil.getUserName());
		metadata.append(GridFSFileField.METADATA_CONTENT_TYPE_KEY, URLConnection.guessContentTypeFromName(sourceFileName));
		if (Optional.ofNullable(category).isPresent()) {
			metadata.append(GridFSFileField.METADATA_CATEGORY_KEY, category);
		}
		GridFSUploadOptions options = new GridFSUploadOptions();
		options.metadata(metadata);
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

	public GridFSFindIterable find(String repositoryName, String attributeName, String value) {
		return this.getBucket(repositoryName).find(Filters.eq(attributeName, value));
	}

	public GridFSFindIterable findById(String repositoryName, String id) {
		return this.getBucket(repositoryName).find(Filters.eq(GridFSFileField.ID, new ObjectId(id)));
	}

	public GridFSFindIterable findByMetadata(String repositoryName, String attributeName, String value) {
		return this.find(repositoryName, GridFSFileField.METADATA_PREFIX + attributeName, value);
	}

	protected GridFSBucket getBucket(String repositoryName) {
		MongoDatabase database = this.mongoClient.getDatabase(AppConstants.GRID_FS_DATABASE);
		return GridFSBuckets.create(database, repositoryName);
	}
}