package p3;

public class Tester2 {

	public static void main(String[] args) {
		// i/f ref can directly refer to ANY concrete imple cls instance
		Bank ref = new HDFC();// up casting
		ref.withdraw(123, 345);//DMD
		//ref.payBills();
		((HDFC) ref).payBills();
		ref = new BOB();
//		((HDFC) ref).payBills();
		if (ref instanceof HDFC)
			((HDFC) ref).payBills();
		else
			System.out.println("Wrong Bank!!!!");
	}

}
