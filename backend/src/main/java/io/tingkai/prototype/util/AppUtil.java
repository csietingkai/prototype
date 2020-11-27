package io.tingkai.prototype.util;

import java.math.BigDecimal;
import java.util.Optional;

import io.tingkai.prototype.constant.CodeConstants;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AppUtil {

	public static String toString(Object obj) {
		if (isPresent(obj)) {
			try {
				return obj.toString();
			} catch (Exception e) {
				log.debug(e.getMessage(), e);
			}
		}
		return CodeConstants.EMPTY_STRING;
	}

	public static int toInt(Object obj) {
		if (isPresent(obj)) {
			try {
				return Integer.parseInt(obj.toString());
			} catch (Exception e) {
				log.debug(e.getMessage(), e);
			}
		}
		return 0;
	}

	public static long toLong(Object obj) {
		if (isPresent(obj)) {
			try {
				return Long.parseLong(obj.toString());
			} catch (Exception e) {
				log.debug(e.getMessage(), e);
			}
		}
		return 0L;
	}

	public static double toDouble(Object obj) {
		if (isPresent(obj)) {
			try {
				return Double.parseDouble(obj.toString());
			} catch (Exception e) {
				log.debug(e.getMessage(), e);
			}
		}
		return 0.0;
	}
	
	public static BigDecimal toBigDecimal(Object obj) {
		if (isPresent(obj)) {
			try {
				return new BigDecimal(obj.toString());
			} catch (Exception e) {
				log.debug(e.getMessage(), e);
			}
		}
		return BigDecimal.ZERO;
	}

	public static boolean isPresent(Object obj) {
		return Optional.ofNullable(obj).isPresent();
	}

	public static boolean isEmpty(Object obj) {
		return Optional.ofNullable(obj).isEmpty();
	}
}
