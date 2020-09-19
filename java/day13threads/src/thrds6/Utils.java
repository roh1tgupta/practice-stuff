package thrds6;

import java.util.Random;

public class Utils {
	private Random r1=new Random();

	public void greet(String mesg) {
//		System.out.println(Thread.currentThread().getName());
		System.out.print("{" + mesg);
		try {
			Thread.sleep(r1.nextInt(100) + 1);
		} catch (Exception e) {
			System.out.println("err in thrd "+Thread.currentThread().getName()+" "+e);
		}
		System.out.println("}"+Thread.currentThread().getName());
	}
}
