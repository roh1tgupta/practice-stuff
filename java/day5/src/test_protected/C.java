package test_protected;

public class C {

	void testMe()
	{
		A a1=new A();
		a1.test();
	}
	
	public static void main(String[] args) {
		C a = new C();
		a.testMe();
	}
}
