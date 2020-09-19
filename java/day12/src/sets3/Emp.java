package sets3;

public class Emp {
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
/*	@Override
	public boolean equals(Object o)
	{
		System.out.println("in emp equals");
		if(o != null && o instanceof Emp)
			return id == ((Emp)o) .id && name.equals(((Emp)o).name);
		return false;
	}
	@Override
	public int hashCode()
	{
		System.out.println("in emp's hC");
		return id * name.hashCode();
	}
*/
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Emp other = (Emp) obj;
		if (id != other.id)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}	
	
}
