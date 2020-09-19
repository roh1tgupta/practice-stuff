package test_protected1;
import test_protected.*;
public class D extends A {

	void show()
	{
//		A a1=new A();
//		a1.test();
		test();
	}
	
	public static void main(String [] args) {
		D d = new D();
		d.show();
	}
}
