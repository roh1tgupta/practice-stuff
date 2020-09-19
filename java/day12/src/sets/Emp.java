package sets;

public class Emp implements Comparable<Emp>{
	private int id;
	private String name;
	private double sal;
	public Emp(int id, String name, double sal) {
		super();
		this.id = id;
		this.name = name;
		this.sal = sal;
	}
	@Override
	public String toString() {
		return "Emp [id=" + id + ", name=" + name + ", sal=" + sal + "]";
	}
	@Override
	public boolean equals(Object o)
	{
		System.out.println("in emp equals");
		if(o != null && o instanceof Emp)
			return id == ((Emp)o) .id;
		return false;
	}
	@Override
	public int hashCode()
	{
		System.out.println("in emp's hC");
		return id;
	}
	@Override
	public int compareTo(Emp o) {
		// asc id based
		return ((Integer)id).compareTo(o.id);
	}
	public double getSal() {
		return sal;
	}
	
	
	
}
