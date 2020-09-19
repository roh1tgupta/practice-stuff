package testStatic;

public class TestStatic {
     static int counter=10;
     private int i;//instance data member
     //static init block : invoked only once per class loading 
     static {
    	 System.out.println("fm static init block counter = "+(counter++));
    	 testIt();
    
     }
     
     public TestStatic(int i) {
		System.out.println("in constr ");
		this.i = i;
	}
	//inst. init block : invoked once per instantiation
     //typically replced by a parameterized constr.
     {
    	 System.out.println("in inst init block"); 
     }
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		System.out.println("fm main "+counter);
		TestStatic t1=new TestStatic(45);
		TestStatic t2=new TestStatic(56);
		

	}
	static void testIt()
	{
		System.out.println("fm testIt counter="+counter++);
	}

}
