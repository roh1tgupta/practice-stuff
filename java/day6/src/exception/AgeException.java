package exception;

public class AgeException extends Exception {
	private int age;
	AgeException(int age) {
		this.age = age;
	}
	
	@Override
	public String toString() {
		return "entered age is: "+this.age+" which is less than 25";
	}
}
