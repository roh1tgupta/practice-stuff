package test_cloning_deep;

public class Test {

	public static void main(String[] args) throws Exception{
		Student s1=new Student(100);
		Address a1=new Address("pune");
		s1.setAdr(a1);
		System.out.println(s1);
		//clone of s1
		Student s2=s1.clone();
		System.out.println(s2);
		System.out.println(s1==s2);
		s1.setRollNo(200);
		s1.getAdr().setCity("mumbai");
		System.out.println(s1);
		System.out.println(s2);

	}

}
