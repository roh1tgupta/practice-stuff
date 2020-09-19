package lists;

import static utils.CollectionUtils.*;

import java.util.Collections;
import java.util.List;

import com.app.bank.Account;

public class TestAccountSorting1 {

	public static void main(String[] args) {
		try {
			//shuffled list of accts
			List<Account> l1 = populateList();
			System.out.println("Orig list "+l1);
			Collections.sort(l1);
			System.out.println("Sorted as per asc id  "+l1);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
