/*
Add noOfEmps -- static data member to Emp class
add static func -- to disp org strength (no of emps)
add static initializer block -- to init static members

*/
package testStatic;
public class  Emp
{
   private int id;
   private String name;
   private double salary;
   private static int noOfEmps;
   private static int offset;

   static {
	    System.out.println("in static init block of Emp ");
	//	System.out.println("id="+id+"  offset" +offset);
		offset=100;
		noOfEmps=offset;//using it as an offset
   }

   public Emp(String nm,double sal)
	{
	  this.id=noOfEmps++;
	   name=nm;
	   salary=sal;
	}
	public String getDetails()
	{
		System.out.println("id="+id+"  offset" +offset);
		return "static --- Emp "+id +"  "+name+"  "+salary;
	}
	public static int getOrgStrength()
	{
//		System.out.println("id="+id+"  offset" +offset);
		return noOfEmps-offset;
	}
}
