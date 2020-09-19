package assignment;

public class FixedStack implements Stack {
	private Employee [] arr =  new Employee[STACK_SIZE];
	private int index = 0;
	
	public Employee push(Employee emp) {
		if (index == (STACK_SIZE)) {
			System.out.println("stack full");
			return null;
		}
		arr[index++] = emp;
		return arr[index - 1];
	}

	
	public Employee pop() {
		if (index == 0) {
			System.out.println("stack empty");
			return null;
		}
		return arr[index-- - 1];
	}
}
