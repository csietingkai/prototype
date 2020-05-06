package io.tingkai.prototype;

import java.time.LocalDateTime;
import java.time.Month;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import io.tingkai.prototype.enumeration.CompareResult;
import io.tingkai.prototype.util.TimeUtil;

@SpringBootTest
public class TimeUtilTest {

	@Test
	public void test() {
		testVerify();
	}

	private void testVerify() {
		String dateStr = "2020/01/22";
		String timeStr = "12:26:53";
		String dateTimeStr = dateStr + " " + timeStr;
		String futureDateTimeString = "2030/01/22 12:26:53";
		long timeStamp = 1579667213000L;
		Assert.assertTrue(timeStamp == TimeUtil.convertToTimeStamp(dateTimeStr));

		// verify
		Assert.assertTrue(TimeUtil.verify(dateTimeStr));

		// random
		System.out.println(TimeUtil.generate());

		// convert
		Assert.assertTrue("2020-01-22T12:26:53".equals(TimeUtil.convertToDateTime(dateTimeStr).toString()));
		Assert.assertTrue("2020-01-22T12:26:53".equals(TimeUtil.convertToDateTime(timeStamp).toString()));
		Assert.assertTrue(
				dateTimeStr.equals(TimeUtil.convertToString(LocalDateTime.of(2020, Month.JANUARY, 22, 12, 26, 53))));
		Assert.assertTrue(dateTimeStr.equals(TimeUtil.convertToString(timeStamp).toString()));
		Assert.assertTrue(
				timeStamp == TimeUtil.convertToTimeStamp(LocalDateTime.of(2020, Month.JANUARY, 22, 12, 26, 53)));

		Assert.assertTrue(CompareResult.BIGGER_THAN == TimeUtil.compare(futureDateTimeString, dateTimeStr));
		Assert.assertFalse(CompareResult.BIGGER_THAN == TimeUtil.compare(dateTimeStr, futureDateTimeString));
		Assert.assertTrue(CompareResult.EQUAL == TimeUtil.compare(dateTimeStr, dateTimeStr));

		// leap year
		Assert.assertTrue(TimeUtil.isLeap(2020));
		Assert.assertFalse(TimeUtil.isLeap(2019));
	}
}
