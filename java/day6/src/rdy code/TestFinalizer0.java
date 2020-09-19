package finalize;

import java.io.*;

import static java.lang.System.*;
import java.util.Date;

public class TestFinalizer0 {
	

	

	public static void main(String[] args) throws Exception {
		TestFinalizer0[] t1=new TestFinalizer0[5];
		for (int i = 0; i <t1.length; i++) {
			t1[i] = new TestFinalizer0();
			t1[i] = null;
		}
		System.gc();
		Thread.sleep(10000);

		out.println("main end");

	}

	public TestFinalizer0() throws Exception {
	
	}

	@Override
	protected void finalize() throws Throwable {
		try {
			System.out.println("in finalize " + Thread.currentThread() + " "
					+ Thread.currentThread().isDaemon());
		} finally {
			super.finalize();
		}
	}

}
