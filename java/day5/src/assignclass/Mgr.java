package assignclass;

public class Mgr extends Emp{
	private double perfBonus;
	public Mgr(String id, String name, int deptId, double basic, double perfBonus) {
		super(id, name, deptId, basic);
		this.perfBonus = perfBonus;
	}
	
	@Override
	public String toString() {
		return super.toString();
	}
	
	public double netSalary() {
		return super.getBasic() + this.perfBonus;
	}
	
	public double getPerfBonus() {
		return this.perfBonus;
	}
}
