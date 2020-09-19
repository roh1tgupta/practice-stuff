package test_equals;

import com.app.cdac.Customer;

public class Test1 {

	public static void main(String[] args) {
		Customer c1=new Customer("abc@gmail", "1234", 500);
		Customer c2=new Customer("abc@gmail", "12345", 1500);
		Customer c3=c1;
	/*	System.out.println(c1==c2);
		System.out.println(c1==c3);
	*/	System.out.println(c1.equals(c2));
		System.out.println(c1.equals(c3));

	}

}
