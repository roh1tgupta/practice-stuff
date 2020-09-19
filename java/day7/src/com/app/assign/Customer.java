package com.app.assign;

import java.util.ArrayList;
import java.util.Date;

public class Customer {

	String email;
	String password;
	double regAmount;
	Date regDate;
	private static ArrayList<String> emails = new ArrayList<String>();
	
	public Customer(String email, String password, double regAmount, Date regDate) {
		this.email = email;
		this.password = password;
		this.regAmount = regAmount;
		this.regDate = regDate;
		Customer.emails.add(email);
	}
	
	public static boolean validateEmail(String email) {
		boolean isuniqueEmail = true;
		for(String em : emails) {
			if (em == email) {
				isuniqueEmail = false;
				break;
			}
		}
		return isuniqueEmail;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public void updatePassword(String pass) {
		this.password = pass;
	}
	
	@Override
	public String toString() {
		return this.email+", "+this.regAmount+", "+this.regDate;
	}
	
	@Override
	public boolean equals(Object e) {
		if (e!=null&& e instanceof Customer) {
			return this.email == ((Customer)e).email;
		}
		return false;
	}
	
	public Date getRegDate() {
		return this.regDate;
	}
	
}
