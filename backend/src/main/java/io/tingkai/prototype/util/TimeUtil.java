package io.tingkai.prototype.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import io.tingkai.prototype.constant.CodeConstants;
import io.tingkai.prototype.enumeration.DateTimeFormatType;

/**
 * Provide method to generate random datetime, convert datetime to String and reversely, get current date and time.
 * 
 * @author tingkai
 */
public class TimeUtil {

	private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern(CodeConstants.DATE_FORMAT).withZone(CodeConstants.ZONE_TPE);
	private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern(CodeConstants.TIME_FORMAT).withZone(CodeConstants.ZONE_TPE);
	private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(CodeConstants.DATE_TIME_FORMAT).withZone(CodeConstants.ZONE_TPE);

//	private static final int YEAR_MIN = 1900;
//	private static final int YEAR_MAX = 9999;
	
//	private static final LocalDate START_DATE = LocalDate.of(YEAR_MIN, 1, 1);
//	private static final LocalDate END_DATE = LocalDate.of(YEAR_MAX, 12, 31);

	public static long getCurrentDate() {
		return LocalDate.now().atStartOfDay(CodeConstants.ZONE_TPE).toInstant().toEpochMilli();
	}

	public static long getCurrentTime() {
		return getCurrentDateTime() - getCurrentDate();
	}

	public static long getCurrentDateTime() {
		return LocalDateTime.now().atZone(CodeConstants.ZONE_TPE).toInstant().toEpochMilli();
	}

	public static boolean verify(String str, DateTimeFormatType type) {
		DateTimeFormatter formatter = null;
		switch (type) {
			case DATE:
				formatter = DATE_FORMATTER;
				break;
			case TIME:
				formatter = TIME_FORMATTER;
				break;
			case DATE_TIME:
			default:
				formatter = DATE_TIME_FORMATTER;
				break;
		}
		try {
			Instant.from(formatter.parse(str)).toEpochMilli();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static long generate() {
		return generate(DateTimeFormatType.DATE_TIME);
	}

	public static long generate(DateTimeFormatType type) {
		// TODO
		switch (type) {
			case DATE:
			case TIME:
			case DATE_TIME:
			default:
				return 0;
		}
	}

	public static String convert(long timeStamp) {
		return convert(timeStamp, DateTimeFormatType.DATE_TIME);
	}

	public static String convert(long timeStamp, DateTimeFormatType type) {
		switch (type) {
			case DATE:
				return DATE_FORMATTER.format(Instant.ofEpochMilli(timeStamp));
			case TIME:
				return TIME_FORMATTER.format(Instant.ofEpochMilli(timeStamp));
			case DATE_TIME:
			default:
				return DATE_TIME_FORMATTER.format(Instant.ofEpochMilli(timeStamp));
		}
	}

	public static long convert(String str) {
		return convert(str, DateTimeFormatType.DATE_TIME);
	}

	public static long convert(String str, DateTimeFormatType type) {
		LocalDateTime dateTime = null;
		switch (type) {
			case DATE:
			case TIME:
				// TODO
				System.out.println("currently not avaliable");
				return -1;
			case DATE_TIME:
			default:
				dateTime = LocalDateTime.parse(str, DATE_TIME_FORMATTER);
		}
		Instant ts = dateTime.atZone(CodeConstants.ZONE_TPE).toInstant();
		return ts.toEpochMilli();
	}

	public static boolean isLeap(int year) {
		return year % 400 == 0 ? true : (year % 100 == 0 ? false : (year % 4 == 0 ? true : false));
	}
}
