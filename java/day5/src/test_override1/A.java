package test_override1;
public class A {
	static void test() {
		System.out.println("in A's test");
	}
	public static void main(String[] args) {
		A b1=new B();
		b1.test();
		
		B b=new B();
		b.test();
	}
}
class B extends A {
	
//	@Override
	static void test() {
		System.out.println("in B's test");
	}
}
