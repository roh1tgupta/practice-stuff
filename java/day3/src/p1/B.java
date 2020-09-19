package p1;
class B extends A
{
	B()
	{
		// i is not visible here
		 System.out.println("B's state "+" "+j+" "+k+" "+l);
	}
	
	public static void main(String[] args) {
		B a = new B();
	}
}
