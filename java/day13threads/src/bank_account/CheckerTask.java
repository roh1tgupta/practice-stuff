package bank_account;

public class CheckerTask implements Runnable {
	private Account a1;
	private double openingBal;
	public CheckerTask(Account a1) throws Exception{
		this.a1=a1;
		openingBal=a1.checkBalance();
	}
	@Override
	public void run() {
		System.out.println(Thread.currentThread().getName() + " strted");
		try {
			double bal=0;
			while(true)
			{
				synchronized (a1) {
					bal=a1.checkBalance();
				}
				
				if(bal != openingBal) {
					System.out.println(bal);
					System.out.println("ERROR!!!!!!!!!");
					System.exit(1);
				}
			//	Thread.sleep(11);
			}
		} catch (Exception e) {
			System.out.println("err in " + Thread.currentThread().getName() + " " + e);
		}
		System.out.println(Thread.currentThread().getName() + " over");

	}

}
