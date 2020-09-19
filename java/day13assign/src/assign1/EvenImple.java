package assign1;

import java.util.Random;

public class EvenImple implements Runnable{

	int start;
	int end;
	Random r;
	public EvenImple(int start, int end) {
		super();
		this.start = start;
		this.end = end;
		r = new Random();
		
	}
	@Override
	public void run() {
		System.out.println(Thread.currentThread().getName()+" starts executing");
		int startpoint = start;
		try {
			while(startpoint < this.end) {
				int sleepms = r.nextInt(1000);
				System.out.println(Thread.currentThread().getName()+" "+startpoint+" sleeptim: "+sleepms);			
				Thread.sleep(sleepms);
				startpoint += 2;
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		System.out.println(Thread.currentThread().getName()+" ends");
	}

}
