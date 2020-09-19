package test_synchro;

import java.util.Random;

public class Tester5 {
	private static boolean exit;

	public static void main(String[] args) throws Exception {
		Random r = new Random();
		Utils u1 = new Utils();

		// creating Runnable tasks using ano inner class
		Runnable r1 = new Runnable() {

			@Override
			public void run() {
				System.out.println("thrd strted " + Thread.currentThread().getName());
				try {
					while (!exit) {
						u1.test();
						Thread.sleep(r.nextInt(50) + 1);

					}
				} catch (Exception e) {
					System.out.println("err in thrd " + Thread.currentThread().getName() + " " + e);
				}
				System.out.println("thrd over " + Thread.currentThread().getName());
			}
		};
		Runnable r2 = new Runnable() {
			@Override
			public void run() {
				try {
					System.out.println("thrd strted " + Thread.currentThread().getName());
					while (!exit) {
						synchronized (u1) {
							u1.testMeAgain();
							Thread.sleep(r.nextInt(50) + 1);
						}

					}
				} catch (Exception e) {
					System.out.println("err in thrd " + Thread.currentThread().getName() + " " + e);
				}
				System.out.println("thrd over " + Thread.currentThread().getName());
			}
		};
		Thread t1 = new Thread(r1, "t1");
		Thread t2 = new Thread(r2, "t2");
		t1.start();
		t2.start();
		System.out.println("Press Enter to stop");
		System.in.read();
		System.out.println("Stopping child thrds");
		exit = true;
		System.out.println("Waiting for child thrds to finish exec");
		t1.join();
		t2.join();
		System.out.println("main over....");

	}

}
