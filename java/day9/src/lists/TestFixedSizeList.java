package lists;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class TestFixedSizeList {

	public static void main(String[] args) {
		//java.util.Arrays --- 
		//public static <T> List<T> asList(T... t)
		List<String> l1=Arrays.asList("abc","1234","abc123");
		System.out.println(l1);
		//how to confirm fixed size ?
		/*
		 * Uncomment below to chk the exc
		 */
//		l1.add("rohit");
//		l1.remove(0); //UnsupportedOperationExc
		System.out.println(l1);
		
		Iterator<String> itr=l1.iterator();
		while(itr.hasNext())
			System.out.println(itr.next());
		System.out.println("................................");
		System.out.println(l1.set(0, l1.get(0).toUpperCase()));
		System.out.println(l1);
		

	}

}
