package cust_comp;

import java.util.Comparator;

import com.app.bank.Account;

public class AccountDateComparator implements Comparator<Account> {

	@Override
	public int compare(Account o1, Account o2) {
		System.out.println("in date comp 's compare");
		return o1.getLinkingDate().compareTo(o2.getLinkingDate());
	}
	

}
