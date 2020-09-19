package test_protected;

public class B extends A {

	void show()
	{
		A a1=new A();
		a1.test();
		test();
	}
	
	public static void main(String[] args) {
		B b = new B();
		b.show();
	}
}
