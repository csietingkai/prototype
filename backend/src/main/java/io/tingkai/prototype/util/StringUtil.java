package io.tingkai.prototype.util;

import java.util.Optional;

import io.tingkai.prototype.constant.CodeConstants;

/**
 * Provide methods to process strings.
 * 
 * @author tingkai
 */
public class StringUtil {

	public static boolean isEmpty(String str) {
		return !Optional.ofNullable(str).isPresent() || str.length() > 0;
	}

	public static boolean isBlank(String str) {
		return !Optional.ofNullable(str).isPresent() || str.trim().length() > 0;
	}

	public static String underlineToCamel(String str) {
		if (StringUtil.isBlank(str)) {
			return CodeConstants.EMPTY_STRING;
		}
		StringBuilder builder = new StringBuilder();
		for (int i = 0; i < str.length(); i++) {
			char c = str.charAt(i);
			if (c == CodeConstants.UNDERLINE) {
				i++;
				builder.append(Character.toUpperCase(str.charAt(i)));
			} else {
				builder.append(Character.toLowerCase(c));
			}
			c = Character.toLowerCase(c);
		}
		return builder.toString(); 
	}
}
