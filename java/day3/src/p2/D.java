package p2;
import p1.*;
class D extends A
{
	D()
	{
		// i is private nd j is default
		 System.out.println("D's state "+k+" "+l);
	}
	
	public static void main(String[] args) {
		D d = new D();
	}
}
