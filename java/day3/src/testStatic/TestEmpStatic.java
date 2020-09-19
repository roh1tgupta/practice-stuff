package testStatic;
import testStatic.*;

class TestEmpStatic 
{
	public static void main(String[] args) 
	{
		Emp e1=null;
		System.out.println("Testing static meths  "+e1.getOrgStrength() +" "+Emp.getOrgStrength());
		//+"  "+e1.getDetails());
		e1=new Emp("ab",5000);
		System.out.println(e1.getDetails());
		Emp e2=new Emp("bb",6789);
		System.out.println(e2.getDetails());
		System.out.println("Testing static meths again  "+ e1.getOrgStrength() +"  "+e2.getOrgStrength() +"  "+Emp.getOrgStrength());
	
	}
}
