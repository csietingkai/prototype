package io.tingkai.prototype.constant;

import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;

/**
 * constants used in code
 * 
 * @author tingkai
 */
public class CodeConstants {

	// === date time format === //
	public static final ZoneId ZONE_TPE = ZoneId.of("Asia/Taipei");
	public static final ZoneId ZONE_UTC = ZoneId.of("UTC");
	public static final String DATE_FORMAT = "yyyy/MM/dd";
	public static final String TIME_FORMAT = "HH:mm:ss";
	public static final String DATE_TIME_FORMAT = DATE_FORMAT + " " + TIME_FORMAT;
	public static final LocalDateTime DATE_TIME_MIN = LocalDateTime.of(1999, Month.JANUARY, 1, 0, 0);
	public static final LocalDateTime DATE_TIME_MAX = LocalDateTime.of(2099, Month.DECEMBER, 31, 23, 59);

	// === security === //
	public static final String PRNG_NAME = "SHA1PRNG";
	public static final String DIGEST_ALGORITHM_NAME = "SHA-256";
	public static final int PRNG_PRODUCT_LENGTH = 32;
	public static final int AUTH_TOKEN_VALID_HOURS = 12;
	public static final String AUTH_TOKEN_KEY = "authToken:";
	public static final String AUTH_USER_KEY = "authUser:";

	// === mail === //
	public static final String CONFIRM_EMAIL_SUBJECT = "Prototype Confrim Email";
	public static final String CONFIRM_EMAIL_CONTENT = "Click the following link to verify email:\n";

	// === other === //
	public static final String EMPTY_STRING = "";
}
