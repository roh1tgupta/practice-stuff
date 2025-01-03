package assign1;

public class EvenNoPrint extends Thread {
	int start;
	int end;
	public EvenNoPrint(String name, int start, int end) {
		super(name);
		this.start = start;
		this.end = end;
		start();
	}
	
	@Override
	public void run() {
		System.out.println(Thread.currentThread().getName()+" starts executing.");
		int startpoint = this.start;
		try {
			while(startpoint < this.end) {
				System.out.println(startpoint);
				startpoint += 2;
				Thread.sleep(500);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		System.out.println(Thread.currentThread().getName()+" ends.");
	}
}
