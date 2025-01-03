package maps;

import static utils.CollectionUtils.*;

import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.Set;

import com.app.bank.Account;

import static java.util.Map.Entry;

public class TestCollectionViewOfMap2 {

	public static void main(String[] args) {
		try {
			Map<Integer, Account> hm = populateMap();
			// display values
			Collection<Account> accts = hm.values();
			System.out.println("\nValues : "+accts);
			for (Account a : accts) {
				hm.put(1, new Account(1, "a", "saving", 5678, new Date()));
				System.out.println(a);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
