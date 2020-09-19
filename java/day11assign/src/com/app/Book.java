package com.app;
import java.util.Date;
import java.io.Serializable;
import java.util.ArrayList;;

public class Book implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String title;
	String author;
	double price;
	Date publishDate;
	String category;
	public static ArrayList<String> al = new ArrayList<String>();
	
	public Book(String title, String author, double price, Date publishDate, String category) throws Exception {
		if (al.contains(title)) {
			throw new Exception("title can't be duplicate");
		}
		this.title = title;
		this.author =  author;
		this.price = price;
		this.publishDate = publishDate;
		this.category = category;
	}
	
	public String getCategory() {
		return this.category;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public double getPrice() {
		return this.price;
	}
	
	@Override
	public String toString() {
		return this.author + ", "+this.category+", "+this.title+", "+this.price;
	}
}
