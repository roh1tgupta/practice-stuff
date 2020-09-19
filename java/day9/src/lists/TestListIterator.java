package lists;

import java.util.ListIterator;
import java.util.Vector;

public class TestListIterator {

	public static void main(String[] args) {
		Vector<String> v = new Vector<>();
		v.add("abc");
		v.add("one");
		v.add("two");
		v.add("three");
		System.out.println(v);
		ListIterator<String> litr = v.listIterator(v.size());
	//	v.add("something");
		while (litr.hasPrevious())
			System.out.println(
					litr.previous() + " prev index " 
			+ litr.previousIndex() + " next index " + litr.nextIndex());

	}

}
