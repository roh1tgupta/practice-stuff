package thrds5;

import java.util.Random;

public class MyRunnableTask implements Runnable {
	private Random r1;

	public MyRunnableTask() {
		r1 = new Random();
	}

	@Override
	public void run() {
		System.out.println(Thread.currentThread().getName() + " strted");
		try {
			for (int i = 0; i < 10; i++) {
				System.out.println(Thread.currentThread().getName() + " exec # " + i);
				Thread.sleep(500);
			}
		} catch (Exception e) {
			System.out.println("err in " + Thread.currentThread().getName() + " " + e);
		}
		System.out.println(Thread.currentThread().getName() + " over");
	}
}
