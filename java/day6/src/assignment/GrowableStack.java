package assignment;

public class GrowableStack implements Stack {
	private Employee [] arr =  new Employee[STACK_SIZE];
	private int index = 0;
	private int size = STACK_SIZE;
	
	public Employee push(Employee emp) {
		if (index == size) {
			Employee [] arr1 = new Employee[index + STACK_SIZE];
			for(int i=0;i<index;i++) {
				arr1[i] = arr[i];
			}
			size = index + STACK_SIZE;
			arr = arr1;
		}
		arr[index++] = emp;
		return arr[index - 1];
	}

	
	public Employee pop() {
		if (index == 0) {
			System.out.println("no items in the stack");
			return null;
		}
		return arr[index-- - 1];
	}
}
