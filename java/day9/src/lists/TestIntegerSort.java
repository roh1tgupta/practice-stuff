package lists;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class TestIntegerSort {

	public static void main(String[] args) {
		List<Integer> l1=Arrays.asList(10,1,2,34,56,78,100);
		System.out.println("Original list "+l1);
		Collections.sort(l1);
		System.out.println("Sorted List "+l1);

	}

}
