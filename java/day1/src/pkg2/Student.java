package pkg2;

class Tester {
	Student st;
	Student st2;
	
	Tester(Student st, Student st2) {
		this.st = st;
		this.st2 = st2;
	}
	
	void displayDetails() {
		System.out.println(this.st.fetchDetail());
		System.out.println(this.st2.fetchDetail());
	}
}
public class Student {
	int id;
	String name;
	String email;
	int age;
	double gpa;
	static int uid = 1;
	
	Student(String name, String email, int age, double gpa) {
		this.name = name;
		this.email = email;
		this.age = age;
		this.gpa = gpa;
		this.id = uid;
		uid += 1;
	}
	
	String fetchDetail() {
		return "name: "+this.name+", email: "+this.email+", age: "+this.age+", gpa: "+this.gpa+", id: "+this.id;
	}
	
	private double getGpa() {
		return this.gpa;
	}
	static double computeGPA(double quiz, double test, double assign) {
		return quiz/5 + test/2 + (assign*3)/10;
	}
	
	static String getStudentWithBestGpa(Student [] stList) {
		Student ab = stList[0];
		for(int i = 1; i < stList.length; i++) {
			if (stList[i].getGpa() > ab.getGpa()) {
				ab = stList[i];
			}
		}
		return ab.fetchDetail();
	}
	public static void main(String[] args) {
		Student st = new Student("rohit", "rohitgupta887@gmail.com", 27, 89.6);
		System.out.println(st.fetchDetail());
		
		Student st1 = new Student("rahul", "rohitgupta887@gmail.com", 27, 90);
		System.out.println(st1.fetchDetail());
		
		Student st2 = new Student("rohit", "rohitgupta887@gmail.com", 27, 79.6);
		System.out.println(st2.fetchDetail());
		System.out.println("testing tester class");
		
		System.out.println("calculated gpa: "+Student.computeGPA(90, 70, 80));
		System.out.println("calculated gpa: "+computeGPA(90, 70, 80));
		Tester t = new Tester(st, st1);
		t.displayDetails();
		
		Student[] arr = new Student[] {st, st1, st2};
		String maxGpaStuDetail = Student.getStudentWithBestGpa(arr);
		
		System.out.println("student with max gpa detail: "+maxGpaStuDetail);
	}
}
