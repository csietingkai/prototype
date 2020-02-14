package io.tingkai.prototype.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import org.apache.commons.codec.binary.Hex;
import org.springframework.stereotype.Component;

import io.tingkai.prototype.constant.CodeConstants;

@Component
public class TokenStringService {

	private SecureRandom secureRandom;
	private MessageDigest messageDigest;

	public TokenStringService() throws NoSuchAlgorithmException {
		this.secureRandom = SecureRandom.getInstance(CodeConstants.PRNG_NAME);
		this.messageDigest = MessageDigest.getInstance(CodeConstants.DIGEST_ALGORITHM_NAME);
		this.secureRandom.nextBytes(new byte[32]);
	}

	public String next() {
		byte[] randomBytes = new byte[CodeConstants.PRNG_PRODUCT_LENGTH];
		this.secureRandom.nextBytes(randomBytes);
		byte[] digestBytes = this.messageDigest.digest(randomBytes);
		return Hex.encodeHexString(digestBytes);
	}
}
