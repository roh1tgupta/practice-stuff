package test_synchro;

import java.util.Random;

public class Utils {
	private static Random r1 = new Random();

	synchronized void test() {
		System.out.println("entered test " + Thread.currentThread().getName());
		try {
			Thread.sleep(r1.nextInt(40) + 1);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("exited test " + Thread.currentThread().getName());
	}

	synchronized void testMe() {
		System.out
				.println("entered testMe " + Thread.currentThread().getName());
		try {
			Thread.sleep(r1.nextInt(40) + 1);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("exited testMe " + Thread.currentThread().getName());
	}

	void testMeAgain() {
		System.out.println("entered testMeagain "
				+ Thread.currentThread().getName());
		try {
			Thread.sleep(r1.nextInt(40) + 1);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("exited testMeagain "
				+ Thread.currentThread().getName());
	}

	synchronized static void test1() {
		System.out.println("entered test1 " + Thread.currentThread().getName());
		try {
			Thread.sleep(r1.nextInt(10) + 1);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("exited test1 " + Thread.currentThread().getName());
	}

	synchronized static void test2() {
		System.out.println("entered test2 " + Thread.currentThread().getName());
		try {
			Thread.sleep(r1.nextInt(10) + 1);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("exited test2 " + Thread.currentThread().getName());
	}

	static void test3() {
		System.out.println("entered test3 " + Thread.currentThread().getName());
		try {
			Thread.sleep(r1.nextInt(10) + 1);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("exited test3 " + Thread.currentThread().getName());
	}

}
