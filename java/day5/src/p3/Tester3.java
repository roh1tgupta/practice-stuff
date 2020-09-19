package p3;

public class Tester3 {

	public static void main(String[] args) {
		Bank[] banks={new HDFC(),new BOB()};
		for(Bank b : banks)
			b.withdraw(123, 500);

	}

}
