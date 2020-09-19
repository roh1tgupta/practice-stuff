package p3;

public class BOB implements Bank {

	@Override
	public int createAccount(String custName, String type, double bal) {
		System.out.println("Created a/c in BOB");
		return 0;
	}

	@Override
	public void withdraw(int acctNo, double amt) {
		System.out.println("withdrawing from BOB");

	}

}
