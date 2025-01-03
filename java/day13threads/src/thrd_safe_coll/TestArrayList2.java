package thrd_safe_coll;

import java.util.ArrayList;
import java.util.Vector;

public class TestArrayList2 {

	public static void main(String[] args) throws Exception {
		ArrayList<Integer> l1 = new ArrayList<Integer>();
		Runnable r1 = new Runnable() {

			@Override
			public void run() {
				int data = 0;
				while (true) {
					synchronized (l1) {
						l1.add(data++);
						if (data > 1000) {
							System.out.println("clearing........");
							data = 0;
							l1.clear();
//							System.exit(1);
						}
						
					}
				}

			}
		};
		Runnable r2 = new Runnable() {

			@Override
			public void run() {
				try {
					while (true) {
						synchronized (l1) {
							for (Integer i : l1)
								System.out.print(i + ",");
						}
						System.out.println(".............");

					}
				} catch (Exception e) {
					System.out.println("err in thrd " + e);
					System.exit(1);
				}

			}
		};
		Thread t1 = new Thread(r1);
		t1.start();
		Thread t2 = new Thread(r2);
		t2.start();
		t1.join();
		t2.join();

	}

}
