package cust_comp;

import java.util.Comparator;

import com.app.bank.Account;

public class AccountDateBalComparator implements Comparator<Account> {

	@Override
	public int compare(Account o1, Account o2) {
		int ret=o1.getLinkingDate().compareTo(o2.getLinkingDate());
		if(ret != 0)
			return ret;
		return ((Double)o1.getBalance()).compareTo(o2.getBalance());
	}

}
