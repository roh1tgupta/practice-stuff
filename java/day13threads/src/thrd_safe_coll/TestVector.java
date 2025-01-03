	package thrd_safe_coll;

import java.util.ArrayList;
import java.util.Vector;

public class TestVector {

	public static void main(String[] args) throws Exception{
		Vector<Integer> l1 = new Vector<Integer>();
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
		
		Thread t2=new Thread(r2);
		t2.start();
		Thread t1=new Thread(r1);
		t1.start();
		t1.join();
		t2.join();

	}

}
