package thrds2;

import java.util.Random;

public class NewThread extends Thread {
	private Random r1;
	public NewThread(String nm) {
		super(nm);
		r1=new Random();
		start();//TO DO --replace by run n observe
	}
	@Override
	public void run()
	{
		System.out.println(Thread.currentThread().getName()+" strted");
		try {
			for(int i=0;i<10;i++)
			{
				System.out.println(Thread.currentThread().getName()+" exec # "+i);
				Thread.sleep(r1.nextInt(500)+1);
			}
		}catch (Exception e) {
			System.out.println("err in "+getName()+" "+e);
		}
		System.out.println(Thread.currentThread().getName()+" over");
	}

}
