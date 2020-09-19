package p2;

public class MyImpleClass implements Printable,Sortable {
	@Override
	public void print()
	{
		System.out.println("in my print "+SIZE);
	}

	@Override
	public void sort() {
		System.out.println("in my sort....");
		
	}
	

}
