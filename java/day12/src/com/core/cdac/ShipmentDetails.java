package com.core.cdac;



public class ShipmentDetails /*implements Serializable*/{
	
	/**
	 * 
	 */
	
	private String city, state, country;

	public ShipmentDetails(String city, String state, String country) {
		super();
		this.city = city;
		this.state = state;
		this.country = country;
	}

	@Override
	public String toString() {
		return "ShipmentDetails [city=" + city + ", state=" + state + ", country=" + country + "]";
	}

}
