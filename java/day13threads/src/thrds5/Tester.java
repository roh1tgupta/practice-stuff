package thrds5;

public class Tester {

	public static void main(String[] args) throws Exception {
		Thread t = Thread.currentThread();
		System.out.println(t);
		// create child thrds
		MyRunnableTask task = new MyRunnableTask();
		//attach thrds to the runnable task
		Thread t1=new Thread(task, "one");
		Thread t2=new Thread(task, "two");
		Thread t3=new Thread(task, "three");
		//start the same
		t1.start();
		t2.start();
		t3.start();
		
		
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
