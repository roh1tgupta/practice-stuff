package com.app.cdac;

public class Customer {
	private String email,password;
	private double regAmount;
	public Customer(String email, String password, double regAmount) {
		super();
		this.email = email;
		this.password = password;
		this.regAmount = regAmount;
	}
	@Override
	public String toString() {
		return "Customer [email=" + email + ", regAmount=" + regAmount + "]";
	}
	@Override
	public boolean equals(Object o)
	{
		System.out.println("in cust's equals");
		if (o == null  || !(o instanceof Customer))
			return false;
		Customer c=((Customer)o);
		return email.equals(c.email);
	}

}
