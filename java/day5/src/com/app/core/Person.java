package com.app.core;

public abstract class Person {
	private String firstName, lastName;

	public Person(String firstName, String lastName) {
		// super();//implicitly calling super cls constr
		this.firstName = firstName;
		this.lastName = lastName;
	}

	// override toString --to replace hashcode
	// version by actual details
	@Override
	public String toString() {
		return firstName + " " + lastName;
	}
	// declare abstract method introduce() -- since its a common feature across
	// sub-classes
	public abstract void introduce();

	public String getFirstName() {
		return firstName;
	}
}
