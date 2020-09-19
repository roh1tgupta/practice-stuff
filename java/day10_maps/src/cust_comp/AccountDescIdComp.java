package cust_comp;

import java.util.Comparator;

public class AccountDescIdComp implements Comparator<Integer> {

	@Override
	public int compare(Integer o1, Integer o2) {
		System.out.println("in compare "+o1+" "+o2);
		return o2.compareTo(o1);
	}

}
