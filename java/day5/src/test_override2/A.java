package test_override2;

public class A {
	int i = 10;
	public static void main(String[] args) {
		A ref=new A();
		System.out.println(ref.i);
		B ref2=new B();
		System.out.println(ref2.i);
		A ref3=new B();
		System.out.println(ref3.i);
		
	}
}

class B extends A {
	int i = 20;

}
