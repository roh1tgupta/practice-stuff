package meth_override;

import java.io.IOException;
import java.io.NotSerializableException;

public class A {
	void show() throws IOException {
		System.out.println("1");
	}
}

class B extends A {
	protected void show() throws Exception {
		System.out.println("2");
	}
}

class Test {
	void test() {
		try {
			A a = new B();
			a.show();
		} catch (IOException e) {
			System.out.println(e);
		}
	}
}
