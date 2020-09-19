package com.app.bank;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import cust_excs.AccountHandlingException;

public class Account implements Comparable<Account>{
	private int acctId;
	private String name, type;
	private double balance;
	private Date linkingDate;
	// id gen
	private static int idGenerator;
	// parser(S-->Date) n formatter(Date ---String)
	public static SimpleDateFormat sdf;
	public static final double MIN_BALANCE;
	public static Date endDate;
	static {
		MIN_BALANCE = 1000;
		try {
			// init sdf
			sdf = new SimpleDateFormat("dd-MM-yyyy");
			endDate = sdf.parse("31-3-2018");
		} catch (ParseException e) {
			System.out.println("err in static init block " + e);
		}
	}

	// constr
	public Account(String name, String type, double bal, Date d1) {
		this.name = name;
		this.type = type;
		balance = bal;
		linkingDate = d1;
		acctId = ++idGenerator;
	}
	

	public Account(int acctId) {
		super();
		this.acctId = acctId;
	}


	@Override
	public String toString() {
		return "A/C Summary " + acctId + " " + name + " " + type + " " + balance + " linked on"
				+ sdf.format(linkingDate);
	}

	public void deposit(double amt) {
		balance += amt;
	}

	public void withdraw(double amt) throws Exception {
		if ((balance - amt) < MIN_BALANCE)
			throw new AccountHandlingException("Insufficeint funds : Withdraw failed!!!!");
		balance -= amt;
	}

	public void transferFunds(Account dest, double amt) throws Exception {
		this.withdraw(amt);
		dest.deposit(amt);
	}
	@Override
	public boolean equals(Object o)
	{
		System.out.println("in acct's equals");
		if(o != null && o instanceof Account)
			return acctId == ((Account)o).acctId;
		return false;
	}
	@Override
	public int compareTo(Account a)
	{
		System.out.println("in compare to "+acctId+" "+a.acctId);
		if(acctId < a.acctId)
			return -1;
		if(acctId == a.acctId)
			return 0;
		return 1;
	}


	public int getAcctId() {
		return acctId;
	}


	public Date getLinkingDate() {
		return linkingDate;
	}
	
	

}
