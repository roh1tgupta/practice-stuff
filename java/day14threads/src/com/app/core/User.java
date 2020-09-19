package com.app.core;

public class User {
	private String email, pass, role;
	private double regAmount;

	public User(String email, String pass, String role, double regAmount) {
		super();
		this.email = email;
		this.pass = pass;
		this.role = role;
		this.regAmount = regAmount;
	}

	@Override
	public String toString() {
		return "Hello " + email + "logged in under " + role + " regAmount=" + regAmount;
	}

	public String getEmail() {
		return email;
	}

	public String getPass() {
		return pass;
	}

	public String getRole() {
		return role;
	}

	public double getRegAmount() {
		return regAmount;
	}
	

}
