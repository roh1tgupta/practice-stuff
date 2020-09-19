package packageArraylist;
import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;
import static packageArraylist.ValidationUtils.*;
import java.util.Collections;
import java.util.Comparator;

public class Tester {

	public static void main(String [] args) {
		ArrayList<Accounts> li = new ArrayList<>();
		try {
			li.add(new Accounts(validateName("rohit"), validateType("saving"), validateBalance(1500), validateDate("30-3-2017")));
			li.add(new Accounts(validateName("roh23"), validateType("fd"), validateBalance(1200), validateDate("30-3-2019")));
			li.add(new Accounts(validateName("rohit45"), validateType("current"), validateBalance(1700), validateDate("30-3-2017")));
			li.add(new Accounts(validateName("rohit1"), validateType("saving"), validateBalance(1100), validateDate("30-3-2017")));
			li.add(new Accounts(validateName("rohit"), validateType("saving"), validateBalance(1800), validateDate("30-8-205")));
			li.add(new Accounts(validateName("rohitash"), validateType("current"), validateBalance(1400), validateDate("7-3-2019")));
			li.add(new Accounts(validateName("rohit"), validateType("saving"), validateBalance(1600), validateDate("30-3-2017")));
			
			for(Accounts i: li) {
				System.out.println(i);
			}
//			
//			Scanner sc = new Scanner(System.in);
//			System.out.println("enter the id");
			int id = 2;// sc.nextInt();
			
			Accounts act = null;
			for(Accounts i: li) {
				if(i.getId() == id) {
					act = i;
					break;
				}
			}
			
			if (act != null) {
				System.out.println(act.toString());
			} else {
				System.out.println("invalid id");
			}
			
			System.out.println("withdrawing fund 50 from acctid 1 and transerfing to accountid 2");
			Accounts srcact = null;
			Accounts destact = null;
			for(Accounts i: li) {
				if(srcact == null && i.getId() == 1) {
					srcact = i;
				} else if (destact == null && i.getId() == 2) {
					destact = i;
				}
				if (srcact!=null && destact!=null) {
					break;
				}
			}
			
			if (srcact!=null && destact !=null) {
				srcact.withdraw(50);
				destact.deposit(50);
				System.out.println("Acount infor of source account: "+srcact.toString());
				System.out.println("Acount infor of dest account: "+destact.toString());
			} else {
				System.out.println("wrong ids for src account and dest account");
			}
			
			id = 5;
			
			for(Accounts i: li) {
				if(i.getId() == id) {
					li.remove(i);
					break;
				}
			}
			System.out.println("after removing ");
			System.out.println(li.toString());
			
			Collections.sort(li, Collections.reverseOrder());
			System.out.println(li.toString());
			
			Collections.sort(li);
			System.out.println(li.toString());
			
			Comparator<Accounts> compareByCreationDate = new Comparator<Accounts>() {
				public int compare (Accounts o1, Accounts o2) {
					return o1.getLinkingDate().getTime() < o2.getLinkingDate().getTime()
							? -1 : (o1.getLinkingDate() == o2.getLinkingDate() ? 0 : 1);
				}
			};
			
			Collections.sort(li, compareByCreationDate);
			System.out.println(li.toString());
			
			Collections.sort(li, new Comparator<Accounts>() {
				public int compare (Accounts o1, Accounts o2) {
					return o1.getBalance() < o2.getBalance()
							? -1 : (o1.getBalance() == o2.getBalance() ? 0 : 1);
				}
			});
			
			System.out.println(li.toString());
		} catch(AccountHandlingException e) {
			System.out.println(e.getMessage());
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
		
	}
}
