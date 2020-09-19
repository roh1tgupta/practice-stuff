package lists;

import java.util.Iterator;
import java.util.LinkedList;

public class TestIteratorExc {

	public static void main(String[] args) {
		LinkedList<Integer> l1=new LinkedList<>();
		l1.add(123);
		l1.add(10);
		l1.add(4567);
		System.out.println(l1);
//		l1.get(100);//IndexOutOfBoundsExc
		Iterator<Integer> itr=l1.iterator();
	//	itr.remove();//can't remove elem before calling next --
		//IllegalStateExc
		System.out.println("___________________");
		while(itr.hasNext()) {
			System.out.print(itr.next()+" ");
			itr.remove();
//			itr.remove(); // this will give illegalstateexception
		}
		System.out.println("\nafter remove "+l1);
//		System.out.println(itr.next());//NoSuchElementExc
		

	}

}
