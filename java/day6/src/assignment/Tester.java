package assignment;
import java.util.Scanner;

public class Tester {
	public static void main(String [] args) {
		System.out.println("press 1 for fixedStack");
		System.out.println("press 2 for GrowableStack");
//		Scanner sc = new Scanner(System.in);
//		int option = sc.nextInt();
//		if (option == 1) {
//			
//		} else if (option == 2) {
//			
//		}
		
//		FixedStack f = new FixedStack();
//		f.push(new Employee(1, "rohit"));
//		f.push(new Employee(1, "rahul"));
//		f.push(new Employee(1, "atul"));
//		f.push(new Employee(1, "simha"));
//		f.push(new Employee(1, "bure"));
//		
//		System.out.println(f.pop().toString());
//		System.out.println(f.pop().toString());
//		System.out.println(f.pop().toString());
//		
//	
//		f.push(new Employee(1, "rahul"));
//		f.push(new Employee(1, "atul"));
//		f.push(new Employee(1, "simha"));
//		f.push(new Employee(1, "bure"));
//		
//		System.out.println(f.pop().toString());
//		System.out.println(f.pop().toString());
//		System.out.println(f.pop().toString());
//		System.out.println(f.pop().toString());
		
		GrowableStack f = new GrowableStack();
		f.push(new Employee(1, "rohit"));
		f.push(new Employee(1, "rahul"));
		f.push(new Employee(1, "atul"));
		f.push(new Employee(1, "simha"));
		f.push(new Employee(1, "bure1"));
		f.push(new Employee(1, "bure2"));
		f.push(new Employee(1, "bure3"));
		
		System.out.println(f.pop().toString());
		System.out.println(f.pop().toString());
		System.out.println(f.pop().toString());
		
	
		f.push(new Employee(1, "bure4"));
		f.push(new Employee(1, "atul2"));
		f.push(new Employee(1, "simha5"));
		f.push(new Employee(1, "bure8"));
		
		System.out.println(f.pop().toString());
		System.out.println(f.pop().toString());
		System.out.println(f.pop().toString());
		System.out.println(f.pop().toString());
		System.out.println(f.pop().toString());
		System.out.println(f.pop().toString());
		System.out.println(f.pop().toString());
		System.out.println(f.pop().toString());
		
	}
}
