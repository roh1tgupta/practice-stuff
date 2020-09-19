package bank_account;

public class UpdaterTask implements Runnable {
	private Account a1;
	public UpdaterTask(Account a1) {
		this.a1=a1;
	}
	@Override
	public void run() {
		System.out.println(Thread.currentThread().getName() + " strted");
		try {
			while(true)
			{
				a1.updateBalance(100);
			}
		} catch (Exception e) {
			System.out.println("err in " + Thread.currentThread().getName() + " " + e);
		}
		System.out.println(Thread.currentThread().getName() + " over");

	}

}
