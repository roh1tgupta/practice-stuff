package itc_with_wait_notify;
public class Utils2 {
	private boolean dataReady;
	private Emp e;
	public synchronized void writeData(Emp ref) throws Exception {
		 System.out.println("w entered --- "+Thread.currentThread().getName());
		 while(dataReady)
			 wait();
		 Thread.sleep(300);
		//produce data
		e = ref;
		System.out.println("Write Data " +e);
		 System.out.println("w exited --- "+Thread.currentThread().getName());
		 dataReady=true;
		 notify();
	
	}

	public synchronized Emp readData() throws Exception {
		 System.out.println("r entered --- "+Thread.currentThread().getName());
		 while(!dataReady)
			 wait();
		//consume data
		System.out.println("Read  Data " + e);
		Thread.sleep(100);
		 System.out.println("r exited --- "+Thread.currentThread().getName());
		 dataReady=false;
		 notify();
		return e;
	}

}
