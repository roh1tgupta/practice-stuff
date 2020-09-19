package utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static utils.ValidationUtils.*;
import com.app.bank.Account;

public class CollectionUtils {
	public static Map<Integer, Account> populateMap() throws Exception {
		HashMap<Integer, Account> hm = new HashMap<>();
		hm.put(10, new Account(10, "a1", "saving", 5000, validateDate("12-3-2017")));
		hm.put(200, new Account(200, "z1", "current", 15000, validateDate("12-3-2017")));
		hm.put(30, new Account(30, "b1", "fd", 5800, validateDate("12-9-2017")));
		hm.put(44, new Account(44, "f1", "saving", 65000, validateDate("1-1-2017")));
		return hm;
	}

	// add a static method to accept un sroted a/cs
	// & to ret sorted list of a/cs
	public static List<Account> getSortedAccts(Map<Integer, Account> map) throws Exception {
		// HM -- coll -- AL
		ArrayList<Account> accts = new ArrayList<>(map.values());
		// sort as per bal
		Collections.sort(accts, new Comparator<Account>() {

			@Override
			public int compare(Account o1, Account o2) {
				// desc order of bal
				return ((Double) o2.getBalance()).compareTo(o1.getBalance());
			}

		});
		return accts;

	}
}
