package test_equals;

import com.app.cdac.Customer;

public class Test2 {

	public static void main(String[] args) {
		Object c1=new Customer("abc@gmail", "1234", 500);
		Customer c2=new Customer("abc@gmail", "12345", 1500);
		System.out.println(c1.equals(c2));
	

	}

}
