package io.tingkai.prototype.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import org.apache.commons.codec.binary.Hex;
import org.springframework.stereotype.Component;

@Component
public class TokenStringService {
	private static final String PRNG_NAME = "SHA1PRNG";
	private static final String DIGEST_ALGORITHM_NAME = "SHA-256";
	private static final int PRNG_PRODUCT_LENGTH = 32;

	private SecureRandom secureRandom;
	private MessageDigest messageDigest;

	public TokenStringService() throws NoSuchAlgorithmException {
		this.secureRandom = SecureRandom.getInstance(TokenStringService.PRNG_NAME);
		this.messageDigest = MessageDigest.getInstance(TokenStringService.DIGEST_ALGORITHM_NAME);
		this.secureRandom.nextBytes(new byte[TokenStringService.PRNG_PRODUCT_LENGTH]);
	}

	public String next() {
		byte[] randomBytes = new byte[TokenStringService.PRNG_PRODUCT_LENGTH];
		this.secureRandom.nextBytes(randomBytes);
		byte[] digestBytes = this.messageDigest.digest(randomBytes);
		return Hex.encodeHexString(digestBytes);
	}
}
