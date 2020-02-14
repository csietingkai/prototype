package io.tingkai.prototype.constant;

import java.time.ZoneId;

/**
 * constants used in code
 * 
 * @author tingkai
 */
public class CodeConstants {

	// === response messages === //
	public static final String SIMPLE_RESPONSE_SUCCESS_MSG = "SUCCESS";
	public static final String SIMPLE_RESPONSE_FAIL_MSG = "FAIL";

	// === date time format === //
	public static final ZoneId ZONE_TPE = ZoneId.of("Asia/Taipei");
	public static final String DATE_FORMAT = "yyyy/MM/dd";
	public static final String TIME_FORMAT = "HH:mm:ss";
	public static final String DATE_TIME_FORMAT = DATE_FORMAT + " " + TIME_FORMAT;

	// === security === //
	public static final String PRNG_NAME = "SHA1PRNG";
	public static final String DIGEST_ALGORITHM_NAME = "SHA-256";
	public static final int PRNG_PRODUCT_LENGTH = 32;
	public static final int AUTH_TOKEN_VALID_HOURS = 12;
	public static final String AUTH_TOKEN_KEY = "authToken:";
	public static final String AUTH_USER_KEY = "authUser:";

	// === other === //
	public static final String EMPTY_STRING = "";
}
