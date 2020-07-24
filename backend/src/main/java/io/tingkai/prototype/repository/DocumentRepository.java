package io.tingkai.prototype.repository;

import java.util.Arrays;

import org.springframework.stereotype.Component;

import io.tingkai.prototype.enumeration.FileType;

/**
 * repository store document file, eg: doc, docx, xls, xlsx, ppt, pptx, pdf
 * 
 * @author tingkai
 */
@Component
public class DocumentRepository extends FileRepository {

	public DocumentRepository() {
		super(Arrays.asList(FileType.DOC, FileType.DOCX, FileType.XLS, FileType.XLSX, FileType.PPT, FileType.PPTX, FileType.PDF));
	}
}
