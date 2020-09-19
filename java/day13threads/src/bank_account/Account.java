package bank_account;

import java.util.Random;

public class Account {
	private double balance;
	private Random r;

	public Account(double bal) {
		balance = bal;
		r = new Random();
	}

	public  synchronized void updateBalance(double amt) throws Exception {
		System.out.println(Thread.currentThread().getName()
				+ " update strted");
		balance = balance + amt;
		Thread.sleep(r.nextInt(100) + 1);
		System.out.println("updated bal: "+balance);
		balance= balance - amt;
		System.out.println(Thread.currentThread().getName() + " update over");
	}
	public  double checkBalance() throws Exception
	{
		System.out.println(Thread.currentThread().getName() + " chking bal " + balance);
	//	Thread.sleep(r.nextInt(10) + 1);
		return balance;
	}

}