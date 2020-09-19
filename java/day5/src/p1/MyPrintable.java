package p1;

public class MyPrintable implements Printable {
	@Override
	public void print()
	{
		System.out.println("in my print "+SIZE);
	}

}
