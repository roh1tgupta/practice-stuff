package com.cust_except;


import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.app.assign.Customer;

public class UtilValidation {
	public static String validateEmail(String email) throws CustomerException {

		String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
		Pattern pat = Pattern.compile(regex);
		Matcher matcher = pat.matcher(email);
		if (!matcher.matches()) {
			throw new CustomerException("invalid format email");
		}
		if (!Customer.validateEmail(email)) {
			throw new CustomerException("user already exist with this email");
		}
		return email;
	}
	
	public static Date validateDate(String date) throws CustomerException {
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy");  
		LocalDateTime now = LocalDateTime.now();
		try {
			Date regDate = sdf.parse(date);
			Date today = sdf.parse(dtf.format(now));
			if (regDate.getTime() < today.getTime()) {
				return regDate;
			}
			throw new CustomerException("invlaid date, date should be of past date");		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new CustomerException("invlaid date, enter in dd-mm-yyyy format");
		}
	}
}
