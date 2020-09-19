package thrds1;

public class Tester {

	public static void main(String[] args) throws Exception{
		Thread t=Thread.currentThread();
		System.out.println(t);
		//create child thrds
		NewThread t1=new NewThread("one");
		NewThread t2=new NewThread("two");
		NewThread t3=new NewThread("three");
		for(int i=0;i<10;i++)
		{
			System.out.println(t.getName()+" exec # "+i);
				Thread.sleep(500);
		}
		System.out.println("main over.....");

	}

}
