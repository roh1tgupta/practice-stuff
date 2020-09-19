package maps;

import static utils.CollectionUtils.*;

import com.app.bank.Account;
import java.util.*;

import cust_comp.AccountDateBalComparator;

import static java.util.Map.Entry;

public class SortAccountsByDateNBal {

	public static void main(String[] args) {
		
		try {
			Map<Integer, Account> hm = populateMap();
			
			//HM---> Collection<V> -- values()
			Collection<Account> accts=hm.values();
			//Covert Collection ---AL (Collection c)
			ArrayList<Account>l1=new ArrayList<>(accts);
			//custom ordering
		    Collections.sort(l1, new AccountDateBalComparator());
		    System.out.println(l1);
		    //replace above by ano inner class syntax
		    Collections.sort(l1,new Comparator<Account>() {
		    	@Override
		    	public int compare(Account a1,Account a2)
		    	{
		    		return a1.getName().compareTo(a2.getName());
		    	}
			});
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

}
