package assignclass;

abstract public class Emp {
	private String id;
	private String name;
	private int deptId;
	private double basic;
	
	Emp(String id, String name, int deptId, double basic) {
		this.id = id;
		this.name = name;
		this.deptId = deptId;
		this.basic = basic;
	}
	
	@Override
	public String toString() {
		return "id: "+this.id+", name: "+this.name+", deptId: "+this.deptId+", basic: "+this.basic;
	}
	
	@Override
	public boolean equals(Object emp) {
		if (emp instanceof Emp)
			return this.id == ((Emp)emp).id;
		return false;
	}
	
	double getBasic() {
		return this.basic;
	}
	
	public abstract double netSalary();
}
