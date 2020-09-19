package thrds;

public class NewThread extends Thread{
	public NewThread(String name) {
		super(name);//NEW
		start();//RDY Pool
	}
	@Override
	public void run() 
	{
		System.out.println("strted "+Thread.currentThread().getName());
		try {
		for(int i=0;i<10;i++)
		{
			System.out.println(getName()+" exec # "+i);
				Thread.sleep(500);
		}
		}catch (Exception e) {
			System.out.println("err in "+getName()+" exc "+e);
		}
		System.out.println("over  "+Thread.currentThread().getName());
	}

}
