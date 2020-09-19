package assignment;

public class Box {
	int width;
	
	Box() {
		this.width = 0;
	}
	void setWidth(int width) {
		this.width = width;
	}

	int getWidth() {
		return this.width;
	}
	
	void displayDim() {
		System.out.println(this.width);
	}
	public static void main(String[] args) {
		Box[] arr = {new Box(), new Box(), new Box()};
		for(Box b: arr) {
			b.setWidth(b.getWidth() + 10);
		}
		
		for(Box b: arr) {
			b.displayDim();
		}
	}
}
