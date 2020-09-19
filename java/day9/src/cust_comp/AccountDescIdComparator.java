package cust_comp;

import java.util.Comparator;

import com.app.bank.Account;

public class AccountDescIdComparator implements Comparator<Account>{
	@Override
	public int compare(Account a1,Account a2)
	{
		System.out.println("in compare ");
		if(a1.getAcctId()<a2.getAcctId())
			return 1;
		if(a1.getAcctId() == a2.getAcctId())
			return 0;
		return -1;
	}
}
