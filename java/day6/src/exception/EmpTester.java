package exception;
import java.util.Scanner;

public class EmpTester {
	String name;
	int age;
	String email;
	EmpTester(String name, int age, String email) {
		this.name = name;
		this.age= age;
		this.email =  email;
	}
	
	void show() {
		System.out.println("name: "+this.name+", age: "+this.age+", email: "+this.email);
	}
	public static void main(String[] args) throws AgeException {
		System.out.println("enter employee name, age and email, age should not be less than 25");
		Scanner sc = new Scanner(System.in);
		String name =  sc.next();
		int age = sc.nextInt();
		String email =  sc.next();
		if (age < 25) {
			throw new AgeException(age);
		}
		EmpTester emp = new EmpTester(name, age, email);
		emp.show();
	}
}

