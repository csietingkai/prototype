package io.tingkai.prototype;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import io.tingkai.prototype.util.TaxIdUtil;

@SpringBootTest
public class TaxIdUtilTest {

	@Test
	public void test() {
		testVerify();
	}

	private void testVerify() {
		String taxId1 = "04595257";
		String taxId2 = "10458575";
		String taxId3 = "10458572";
		
		// verify
		Assert.assertTrue(TaxIdUtil.verify(taxId1));
		Assert.assertTrue(TaxIdUtil.verify(taxId2));
		Assert.assertFalse(TaxIdUtil.verify(taxId3));
	}
}
