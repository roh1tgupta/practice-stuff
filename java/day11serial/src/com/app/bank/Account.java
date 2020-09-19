package com.app.bank;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import cust_excs.AccountHandlingException;

public class Account implements Serializable{
	private int acctId;
	private String name, type;
	private double balance;
	private Date linkingDate;
	
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
	public Account(int acctId,String name, String type, double bal, Date d1) {
		this.name = name;
		this.type = type;
		balance = bal;
		linkingDate = d1;
		this.acctId = acctId;
	}
	
	@Override
	public String toString() {
		return acctId + " " + name + " " + type + " " + balance +" "+sdf.format(linkingDate);
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
	public int getAcctId() {
		return acctId;
	}


	public Date getLinkingDate() {
		return linkingDate;
	}

	public String getName() {
		return name;
	}

	public String getType() {
		return type;
	}

	public double getBalance() {
		return balance;
	}

	public static Date getEndDate() {
		return endDate;
	}
	
	
	

}
