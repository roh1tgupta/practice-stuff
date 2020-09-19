package tester;

import shapes.*;

public class TestInterface {

	public static void main(String[] args) {
		//direct ref
		Circle c1=new Circle(10,20, 10.5);
		System.out.println(c1+" area "+c1.calcArea()+" peri "+c1.calcPerimeter());
		Rectangle r1=new Rectangle(5, 50, 10, 5.6);
		System.out.println(r1+" area "+r1.calcArea()+" peri "+r1.calcPerimeter());
		//indirect ref
		Computable ref;//JVM specified byes allocated on stack
		ref=c1;//upcasting
		System.out.println(ref+" area "+ref.calcArea()+" peri "+ref.calcPerimeter());
		ref=r1;//upcasting
		System.out.println(ref+" area "+ref.calcArea()+" peri "+ref.calcPerimeter());
	
	}

}
