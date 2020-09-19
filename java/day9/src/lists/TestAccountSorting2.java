package lists;

import static utils.CollectionUtils.*;

import java.util.Collections;
import java.util.List;

import com.app.bank.Account;

import cust_comp.AccountDateComparator;
import cust_comp.AccountDescIdComparator;

public class TestAccountSorting2 {

	public static void main(String[] args) {
		try {
			//shuffled list of accts
			List<Account> l1 = populateList();
			System.out.println("Orig list "+l1);
			Collections.sort(l1,new AccountDescIdComparator());
			System.out.println("Sorted as per desc  id  "+l1);
			//accts sorted as per date
			Collections.sort(l1, new AccountDateComparator());
			System.out.println("Sorted as per date  "+l1);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
