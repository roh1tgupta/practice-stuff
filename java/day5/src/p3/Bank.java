package p3;

public interface Bank {
	int createAccount(String custName, String type, double bal);
	void withdraw(int acctNo,double amt);

}
