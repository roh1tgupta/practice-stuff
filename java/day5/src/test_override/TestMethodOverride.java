package test_override;

class Useful {
	public void f() {
		System.out.println("1");
	}

	public void g() {
		System.out.println("3");
	}
}

class MoreUseful extends Useful {
	public void f() {
		System.out.println("2");
	}

	public void g() {
		System.out.println("4");
	}

	public void u() {
		System.out.println("5");
	}

}

public class TestMethodOverride {
	public static void main(String[] args) {
		Useful[] x = { new Useful(), new MoreUseful() };
		x[0].f();
		x[1].g();
	//	x[0].u();
	((MoreUseful)x[1]).u();
	((MoreUseful)x[0]).u();
		
	}
}
