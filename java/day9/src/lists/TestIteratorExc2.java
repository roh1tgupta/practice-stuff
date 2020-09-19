package lists;

import java.util.Iterator;
import java.util.LinkedList;

public class TestIteratorExc2 {

	public static void main(String[] args) {
		LinkedList<Integer> l1=new LinkedList<>();
	
		l1.add(123);
		l1.add(10);
		l1.add(4567);
		System.out.println(l1);
		Iterator<Integer> itr=l1.iterator();
		while(itr.hasNext()) {
			System.out.print(itr.next()+" ");
			
		}
		System.out.println("");
		l1.add(4567);
		itr=l1.iterator();
		while(itr.hasNext()) {
			System.out.print(itr.next()+" ");
			
		}
		System.out.println("");
		System.out.println(l1);
	

		

	}

}
