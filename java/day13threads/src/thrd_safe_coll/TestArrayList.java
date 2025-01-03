package thrd_safe_coll;

import java.util.ArrayList;

public class TestArrayList {

	public static void main(String[] args) throws Exception{
		ArrayList<Integer> l1 = new ArrayList<Integer>();
		Runnable r1 = new Runnable() {

			@Override
			public void run() {
				int data=0;

				while (true)
					l1.add(data++);

			}
		};
		Runnable r2 = new Runnable() {

			@Override
			public void run() {
				try {
					while (true) {
						for (Integer i : l1)
							System.out.println(i);
					}
				} catch (Exception e) {
					System.out.println("err in thrd " + e);
					System.exit(1);
				}

			}
		};
		Thread t1=new Thread(r1);
		t1.start();
		Thread t2=new Thread(r2);
		t2.start();
		t1.join();
		t2.join();
		System.out.println("main over");

	}

}
