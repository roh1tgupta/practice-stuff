package test_equals;

import com.app.cdac.Customer;

public class Test3 {

	public static void main(String[] args) {
		Object c1=new Customer("abc@gmail", "1234", 500);

		String ss="Test me!!!!";
		System.out.println(c1.equals(ss));
	

	}

}
