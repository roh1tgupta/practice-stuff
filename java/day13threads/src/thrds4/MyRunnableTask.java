package thrds4;

import java.util.Random;

public class MyRunnableTask implements Runnable {
	private Random r1;
	//declare thrd
	private Thread t;//Doesn't exist
	public MyRunnableTask(String nm) {
		//create a thrd by attaching runnable task
		//Thread(Runnable inst,String nm)
		t=new Thread(this, nm);//NEW
		t.start();
	}
	@Override
	public void run()
	{
		System.out.println(Thread.currentThread().getName()+" strted");
		try {
			for(int i=0;i<10;i++)
			{
				System.out.println(Thread.currentThread().getName()+" exec # "+i);
				Thread.sleep(500);
			}
		}catch (Exception e) {
			System.out.println("err in "+t.getName()+" "+e);
		}
		System.out.println(Thread.currentThread().getName()+" over");
	}
	public Thread getT() {
		return t;
	}
	

}
