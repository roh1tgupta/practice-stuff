package thrds6_synchro_method;

import java.util.Random;

public class Utils {
	private Random r1=new Random();

	public synchronized void greet(String mesg) {
		System.out.print("{" + mesg);
		try {
			Thread.sleep(r1.nextInt(100) + 1);
		} catch (Exception e) {
			System.out.println("err in thrd "+Thread.currentThread().getName()+" "+e);
		}
		System.out.println("}"+Thread.currentThread().getName());
	}
}
