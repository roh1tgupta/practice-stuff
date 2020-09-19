package sets3;

import java.util.HashSet;

public class EmpSet {

	public static void main(String[] args) {
		HashSet<Emp> emps=new HashSet<>();
		System.out.println(emps.add(new Emp(10, "abc",1000)));
		System.out.println(emps.add(new Emp(1, "abc",2000)));
		System.out.println(emps.add(new Emp(10, "abc123",5000)));
		System.out.println(emps.add(new Emp(12, "abc100",5000)));
		System.out.println(emps.add(new Emp(10, "abc",1000)));
		System.out.println(emps);
		System.out.println(emps.size());

	}

}
