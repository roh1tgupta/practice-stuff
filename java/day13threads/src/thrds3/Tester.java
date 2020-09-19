package thrds3;

public class Tester {

	public static void main(String[] args) throws Exception {
		Thread t = Thread.currentThread();
		System.out.println(t);
		// create child thrds
		NewThread t1 = new NewThread("one");
		NewThread t2 = new NewThread("two");
		NewThread t3 = new NewThread("three");
		System.out.println("main waiting for child thrds to finish exec");
		System.out.println(t1.isAlive()+" "+t3.isAlive());
		//ensure no orphans 
		t1.join();
		System.out.println("main waiting for t2");
		t2.join();
		t3.join();
		System.out.println(t1.isAlive()+" "+t3.isAlive());
		System.out.println("main over.....");

	}

}
