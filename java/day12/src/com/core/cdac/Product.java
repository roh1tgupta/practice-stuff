package com.core.cdac;

import java.io.Serializable;

public class Product implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2860658443477540724L;
	private int id,quantity;
	private String desc,catgeory;
	private double price;
	//HAS A ShipmentDetails
	private transient ShipmentDetails details;
	public Product(int id, int quantity, String desc, String catgeory, double price) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.desc = desc;
		this.catgeory = catgeory;
		this.price = price;
	}
	public void setDetails(ShipmentDetails details) {
		this.details=details;
	}
	@Override
	public String toString() {
		return "Product [id=" + id + ", quantity=" + quantity + ", desc=" + desc + ", catgeory=" + catgeory + ", price="
				+ price +" shipped to "+details;
	}
	
	
	
	

}
