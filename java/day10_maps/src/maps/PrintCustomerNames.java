package maps;

import static utils.CollectionUtils.*;

import java.util.Collection;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

import com.app.bank.Account;

import static java.util.Map.Entry;

public class PrintCustomerNames {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		try {
			Map<Integer, Account> hm = populateMap();
			System.out.println("Enter a/c type");
			String acType=sc.next();
			//HM---> Collection<V> -- values()
			Collection<Account> accts=hm.values();
			for(Account a : accts)
				if(a.getType().equals(acType))
					System.out.println(a.getName());
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sc != null)
				sc.close();
		}

	}

}
