package com.app.tester;

import java.util.Date;
import java.util.Scanner;

import com.app.assign.*;
import com.cust_except.*;

public class Tester {
	public static void main(String[] args) {
		boolean flag = false;
		Scanner sc = new Scanner(System.in);
		Customer cust1;
		Customer cust2;
		while(!flag) {
			try {
				System.out.println("please enter detail of first cutomer email, password, registration amount and registration date");
				String email = UtilValidation.validateEmail(sc.next());
				String pass = sc.next();
				double amt = sc.nextDouble();
				Date date = UtilValidation.validateDate(sc.next());
				cust1 = new Customer(email, pass, amt, date);
				
				System.out.println("please enter detail of second cutomer email, password, registration amount and registration date");
				email = UtilValidation.validateEmail(sc.next());
				pass = sc.next();
				amt = sc.nextDouble();
				date = UtilValidation.validateDate(sc.next());
				cust2 = new Customer(email, pass, amt, date);
				
				System.out.println("are both customer equals: "+cust1.equals(cust2));
				System.out.println(cust1.toString());
				System.out.println(cust2.toString());
				
			} catch (CustomerException e) {
				System.out.println(e.getMessage());
				continue;
			}
			flag = true;
		}
	}
}
