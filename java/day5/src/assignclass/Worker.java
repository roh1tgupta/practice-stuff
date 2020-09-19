package assignclass;

public class Worker extends Emp {
	private double hourlyRate;
	private int hoursWorked;
	public Worker(String id, String name, int deptId, double basic, int hoursWorked, double hourlyRate) {
		super(id, name, deptId, basic);
		this.hourlyRate = hourlyRate;
		this.hoursWorked = hoursWorked;
	}
	
	@Override
	public String toString() {
		return super.toString()+", hoursWorked: "+this.hoursWorked;
	}
	
	public double netSalary() {
		return super.getBasic() + this.hoursWorked * this.hourlyRate;
	}
	
	public double getHourlyRate() {
		return this.hourlyRate;
	}
}
