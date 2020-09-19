import static packageArraylist.ValidationUtils.validateBalance;
import static packageArraylist.ValidationUtils.validateDate;
import static packageArraylist.ValidationUtils.validateName;
import static packageArraylist.ValidationUtils.validateType;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Scanner;

import packageArraylist.*;

public class Asssign9 {

	public static void main(String [] args) {
		HashMap<Integer, Accounts> hm = new HashMap<>();
		Scanner sc = new Scanner(System.in);
		try {
			hm.put(1, new Accounts(validateName("rohit"), validateType("saving"), validateBalance(1500), validateDate("30-3-2017")));
			hm.put(2, new Accounts(validateName("roh23"), validateType("fd"), validateBalance(1200), validateDate("30-3-2019")));
			hm.put(3, new Accounts(validateName("rohit45"), validateType("current"), validateBalance(1700), validateDate("30-3-2017")));
			hm.put(4, new Accounts(validateName("rohit1"), validateType("saving"), validateBalance(1100), validateDate("30-3-2017")));
			hm.put(5, new Accounts(validateName("rohit"), validateType("saving"), validateBalance(1800), validateDate("30-8-205")));
			hm.put(6, new Accounts(validateName("rohitash"), validateType("current"), validateBalance(1400), validateDate("7-3-2019")));
			hm.put(7, new Accounts(validateName("rohit"), validateType("saving"), validateBalance(1600), validateDate("30-3-2017")));
			
			for(int i: hm.keySet()) {
				System.out.println(hm.get(i));
			}

			int id = 2;
			if (hm.get(id) != null) {
				System.out.println(hm.get(id));
			}

			System.out.println(hm.values());
			
			System.out.println(hm.entrySet());
			
		} catch(AccountHandlingException e) {
			System.out.println(e.getMessage());
		} catch(Exception e) {
			System.out.println(e.getMessage());
		} finally {
			sc.close();
		}
	}
}
