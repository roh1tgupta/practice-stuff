package casting;

public class TestMe {

	public static void main(String[] args) {
		A ref=new B();
		ref.show();
		B ref2=(B)ref;
		ref2.show();
		B ref3=(B)new A();
		ref3.show();

	}

}
class A
{
	void show()
	{
		System.out.println("A's show");
	}
}
class B extends A
{
	void show()
	{
		System.out.println("B's show");
	}
}
