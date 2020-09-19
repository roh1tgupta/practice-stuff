package p3;

public class HDFC implements Bank {

	@Override
	public int createAccount(String custName, String type, double bal) {
		System.out.println("created a/c in " 
	+ getClass().getName());
		return 0;
	}

	@Override
	public void withdraw(int acctNo, double amt) {
		System.out.println("withdrawing funds in HDFC bank");

	}
	//value added service 
	public void payBills()
	{
		System.out.println("Paying Bill's thro HDFC");
	}

}
