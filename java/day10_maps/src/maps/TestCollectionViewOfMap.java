package maps;

import static utils.CollectionUtils.*;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

import com.app.bank.Account;

import static java.util.Map.Entry;

public class TestCollectionViewOfMap {

	public static void main(String[] args) {
		try {
			Map<Integer, Account> hm = populateMap();
			// display keys from HM
			Set<Integer> acctIds = hm.keySet();
			System.out.println("Keys : ");
			for (int i : acctIds)
				System.out.print(i + " ");
			// display values
			Collection<Account> accts = hm.values();
			System.out.println("\nValues : ");
			for (Account a : accts)
				System.out.println(a);
			// display entries
			System.out.println("Entries : ");
			Set<Entry<Integer, Account>> entries = hm.entrySet();
			for (Entry<Integer, Account> e : entries)
				System.out.println("Key " + e.getKey() 
				+ " Val : " + e.getValue());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
