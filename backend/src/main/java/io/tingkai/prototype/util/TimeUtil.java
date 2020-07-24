package io.tingkai.prototype.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import io.tingkai.prototype.constant.CodeConstants;
import io.tingkai.prototype.enumeration.CompareResult;

/**
 * Provide method to generate random datetime, convert datetime to String and
 * reversely, get current date and time.
 * 
 * @author tingkai
 */
public class TimeUtil {

	private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(CodeConstants.DATE_TIME_FORMAT).withZone(CodeConstants.ZONE_TPE);

	public static long getCurrentDate() {
		return LocalDate.now().atStartOfDay(CodeConstants.ZONE_TPE).toInstant().toEpochMilli();
	}

	public static long getCurrentDateTime() {
		return LocalDateTime.now().atZone(CodeConstants.ZONE_TPE).toInstant().toEpochMilli();
	}

	public static boolean verify(String str) {
		try {
			convertToTimeStamp(str);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static LocalDateTime generate() {
		return generate(CodeConstants.DATE_TIME_MIN, CodeConstants.DATE_TIME_MAX);
	}

	public static LocalDateTime generate(LocalDateTime start, LocalDateTime end) {
		if (start.isAfter(end)) {
			LocalDateTime temp = end;
			end = start;
			start = temp;
		}
		long startTimeStamp = convertToTimeStamp(start);
		long endTimeStamp = convertToTimeStamp(end);
		long randomTimeStamp = (long) (Math.random() * ((startTimeStamp - endTimeStamp) + 1) + startTimeStamp);
		return convertToDateTime(randomTimeStamp);
	}

	public static LocalDateTime convertToDateTime(String str) {
		return LocalDateTime.parse(str, DATE_TIME_FORMATTER);
	}

	public static LocalDateTime convertToDateTime(long timeStamp) {
		return LocalDateTime.ofInstant(Instant.ofEpochMilli(timeStamp), CodeConstants.ZONE_TPE);
	}

	public static String convertToString(LocalDateTime dateTime) {
		return DATE_TIME_FORMATTER.format(dateTime);
	}

	public static String convertToString(long timeStamp) {
		return DATE_TIME_FORMATTER.format(Instant.ofEpochMilli(timeStamp));
	}

	public static long convertToTimeStamp(LocalDateTime dateTime) {
		return dateTime.atZone(CodeConstants.ZONE_TPE).toInstant().toEpochMilli();
	}

	public static long convertToTimeStamp(String str) {
		return Instant.from(DATE_TIME_FORMATTER.parse(str)).toEpochMilli();
	}

	/**
	 * compare a is (bigger than / equal to / less than ) b
	 */
	public static CompareResult compare(LocalDateTime a, LocalDateTime b) {
		if (a.isAfter(b)) {
			return CompareResult.BIGGER_THAN;
		} else if (a.isBefore(b)) {
			return CompareResult.LESS_THAN;
		} else {
			return CompareResult.EQUAL;
		}
	}

	public static CompareResult compare(String dateStrA, String dateStrB) {
		return compare(convertToDateTime(dateStrA), convertToDateTime(dateStrB));
	}

	public static boolean isLeap(int year) {
		return year % 400 == 0 ? true : (year % 100 == 0 ? false : (year % 4 == 0 ? true : false));
	}
}
