package thrds4;

public class Tester {

	public static void main(String[] args) throws Exception {
		Thread t = Thread.currentThread();
		System.out.println(t);
		// create child thrds
		MyRunnableTask t1 = new MyRunnableTask("one");
		MyRunnableTask t2 = new MyRunnableTask("two");
		MyRunnableTask t3 = new MyRunnableTask("three");
		System.out.println("main waiting for child thrds to finish exec");
		System.out.println(t1.getT().isAlive()+" "+t3.getT().isAlive());
		//ensure no orphans 
		t1.getT().join();
		System.out.println("main waiting for t2");
		t2.getT().join();
		t3.getT().join();
		System.out.println(t1.getT().isAlive()+" "+t3.getT().isAlive());
		System.out.println("main over.....");

	}

}
