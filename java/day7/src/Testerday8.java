
	import java.util.Date;
import java.util.Iterator;
import java.util.Scanner;
import java.util.ArrayList;
	import com.app.assign.*;
	import com.cust_except.*;

	public class Testerday8 {
		public static void main(String[] args) {
			boolean flag = false;
			Scanner sc = new Scanner(System.in);
			ArrayList<Customer> li = new ArrayList<Customer>();
			try {
			li.add(new Customer(UtilValidation.validateEmail("abcd@gmail.com"), "rohit", 654, UtilValidation.validateDate("2-3-2019")));
			li.add(new Customer(UtilValidation.validateEmail("abcde@gmail.com"), "rohitash", 653, UtilValidation.validateDate("2-5-2019")));
			li.add(new Customer(UtilValidation.validateEmail("abcdr@gmail.com"), "rohitg", 6546, UtilValidation.validateDate("2-2-2019")));
			} catch(CustomerException e) {
				System.out.println(e.getMessage());
			}
			while(!flag) {
				try {
					System.out.println("enter 1 to add customer \n enter 2 to add display customers"
							+ "\n enter 3 to update password \n enter 4 to exit \n enter 5 to delete customer"
							+ "\n enter 6 for showing details with iterator");
					int choice = sc.nextInt();
					switch(choice) {
					case 1:
						System.out.println("please enter detail cutomer email, password, registration amount and registration date");
						String email = UtilValidation.validateEmail(sc.next());
						String pass = sc.next();
						double amt = sc.nextDouble();
						Date date = UtilValidation.validateDate(sc.next());
						li.add(new Customer(email, pass, amt, date));
						break;
					case 2:
						for(Customer cust: li) {
							System.out.println(cust.toString());
						}
						break;
					case 3:
						System.out.println("please enter email");
						email = sc.next();
						
						boolean isExistingEmail = false;
						for(Customer cust: li) {
							if (cust.getEmail().contentEquals(email)) {
								isExistingEmail = true;
								System.out.println("please enter new pass2owrd");
								pass=sc.next();
								cust.updatePassword(pass);
								break;
							}
						}
						if (!isExistingEmail) {
							throw new CustomerException("email not found");
						}
						break;
					case 4:
						flag = true;
						break;
					case 5:
						System.out.println("enter email id of the customer that needs to be delted");
						email = sc.next();
						isExistingEmail = false;
						Customer cust1 = null;
						for(Customer cust: li) {
							if (cust.getEmail().contentEquals(email)) {
								isExistingEmail = true;
								cust1 = cust;
								break;
							}
						}
						if (!isExistingEmail) {
							throw new CustomerException("email not found");
						}
						System.out.println("customer reomved: "+li.remove(cust1));
						break;
					case 6:
						Iterator<Customer> itr = li.iterator();
						while(itr.hasNext()) {
							System.out.println("info: "+itr.next());
						}
						break;
					default:
						continue;
					}
				} catch (CustomerException e) {
					System.out.println(e.getMessage());

				} catch (Exception e) {
					System.out.println(e.getMessage());
					
				}
			}
			sc.close();
			
		}
	}
