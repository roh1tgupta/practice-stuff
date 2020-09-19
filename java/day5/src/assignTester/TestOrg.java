package assignTester;
import java.util.Scanner;

import assignclass.*;

public class TestOrg {

	public static void main(String[] args) {
		Emp[] arr = new Emp[5];
		boolean flag = false;
		String id;
		String name;
		int deptId;
		double basic;
		double perfbonus;
//		System.out.println(arr.length);
		int i = 0;
		while(!flag) {
			System.out.println("press 1 for hiring manager");
			System.out.println("press 2 for hiring Worker");
			System.out.println("press 3 for displaying info of all employee");
			System.out.println("press 10 for exit");
			Scanner sc = new Scanner(System.in);
			int option = sc.nextInt();
			if (option == 1) {
				System.out.println(" enter manager detail followed by id, name, deptid, basic, performance bonus");
				id = sc.next();
				name = sc.next();
				deptId = sc.nextInt();
				basic = sc.nextDouble();
				perfbonus = sc.nextDouble();
				arr[i++] = new Mgr(id, name, deptId, basic, perfbonus);
			} else if (option == 2) {
				System.out.println(" enter worker detail followed by id, name, deptid, basic, hoursworked and hourly rate");
				arr[i++] = new Worker(sc.next(), sc.next(), sc.nextInt(), sc.nextDouble(), sc.nextInt(), sc.nextDouble());
			} else if (option == 3) {
				for(int j=0;j<i;j++) {
					String exrainfo = "";
					if (arr[j] instanceof Mgr) {
						exrainfo += ", perfbonus: "+((Mgr)arr[j]).getPerfBonus()+", netslary: "+arr[j].netSalary();
					} else if (arr[j] instanceof Worker) {
						exrainfo += ", hourlyrate: "+((Worker)arr[j]).getHourlyRate()+", netslary: "+arr[j].netSalary();
					}
					System.out.println(arr[j].toString()+""+exrainfo);
				}
			} else if (option == 10) {
				flag = true;
			}
		}
		System.out.println("Exited");
	}
}
