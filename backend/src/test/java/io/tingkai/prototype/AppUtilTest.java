package io.tingkai.prototype;

import java.math.BigDecimal;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import io.tingkai.prototype.util.AppUtil;

@SpringBootTest
public class AppUtilTest {

	@Test
	public void test() {
		testToType();
		testCheckNull();
	}

	private void testToType() {
		Object obj = "AAA";
		Assert.assertEquals(AppUtil.toString(obj), "AAA");
		obj = 123;
		Assert.assertTrue(AppUtil.toInt(obj) == 123);
		obj = 123L;
		Assert.assertTrue(AppUtil.toLong(obj) == 123L);
		obj = 123.123;
		Assert.assertTrue(AppUtil.toDouble(obj) == 123.123);
		obj = new BigDecimal(10);
		Assert.assertEquals(AppUtil.toBigDecimal(obj), BigDecimal.TEN);
	}
	
	private void testCheckNull() {
	}
}
