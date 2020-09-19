package p4;

public class MyImpleClass implements Printable, Sortable {
	@Override
	public void print() {
		System.out.println("in my print " + Printable.SIZE + " "
				+ Sortable.SIZE);
	}

}
