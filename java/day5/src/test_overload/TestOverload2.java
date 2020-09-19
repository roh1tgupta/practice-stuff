package test_overload;
class TestOverload2 
{
	public static void main(String[] args) 
	{
		int l = 13;
		test(13, 14);
		test(l);
	}
	
	
	static void test(Integer o)
	{
		System.out.println("in Integer version");
	}
	static void test(int... o)
	{
		System.out.println("in int... version");
	}
	static void test(double o)
	{
		System.out.println("in double version");
	}
	
}
