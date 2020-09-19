package sets3;

import java.util.HashSet;

public class IntegerSet {

	public static void main(String[] args) {
		int[] ints={12,34,2,56,23,12,34,5,6,100};
		HashSet<Integer> hs=new HashSet<>();
		for(int i : ints)
			System.out.println("Added "+hs.add(i));
		System.out.println("HS : "+hs);
		System.out.println(hs.contains(100));

	}

}
