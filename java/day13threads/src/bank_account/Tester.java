package bank_account;

public class Tester {

	public static void main(String[] args) throws Exception{
		//create shared resource -- Account obj
		Account a=new Account(10000);
		//create tasks, attach thrds & strt them
		Thread t1=new Thread(new UpdaterTask(a), "t1");
		Thread t2=new Thread(new CheckerTask(a), "t2");
		System.out.println("starting child thrds...");
		t2.start();
		t1.start();
		System.out.println("waiting for child thrds...");
		t1.join();
		t2.join();
		System.out.println("main over...");
		

	}

}
