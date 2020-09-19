package sets;

import java.util.Comparator;
import java.util.HashSet;
import java.util.TreeSet;

public class SortedEmpSet1 {

	public static void main(String[] args) {
		HashSet<Emp> emps=new HashSet<>();
		System.out.println(emps.add(new Emp(10, "abc",1000)));
		System.out.println(emps.add(new Emp(1, "abc2",2000)));
		System.out.println(emps.add(new Emp(5, "abc123",5000)));
		System.out.println("Unsorted set "+emps);
		System.out.println(emps.size());
		//sorted set as per asc order of id
		TreeSet<Emp> ts1=new TreeSet<>(emps);
		System.out.println("Sorted set "+ts1);
		//sort emps as per sal --w/o touching EMP
		TreeSet<Emp> ts2=new TreeSet<>(new Comparator<Emp>() {

			@Override
			public int compare(Emp o1, Emp o2) {
				System.out.println("in compare");
				return ((Double)o1.getSal()).compareTo(o2.getSal());
			}
			
		});
		ts2.addAll(emps);
		System.out.println("Sorted set by sal  "+ts2);
		

	}

}
