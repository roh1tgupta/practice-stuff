package utils;

import cust_excs.AccountHandlingException;
import static com.app.bank.Account.*;

import java.util.Date;

public class ValidationUtils {

	// public static methods --- validation rules
	public static void validateName(String name) throws Exception {
		if (name.length() < 4 || name.length() > 14)
			throw new AccountHandlingException("Invalid cusotmer name....");

	}

	public static void validateType(String type) throws Exception {
		switch (type.toUpperCase()) {
		case "SAVING":
		case "CURRENT":
		case "FD":
			break;

		default:
			throw new AccountHandlingException("Unsupported a/c type...");
		}
	}

	public static void validateBalance(double bal) throws AccountHandlingException {
		if (bal < MIN_BALANCE)
			throw new AccountHandlingException("Insufficient opening bal ");
	}

	public static Date validateDate(String s) throws Exception {
		// parse
		Date d = sdf.parse(s);
		// validate range
		if (d.after(endDate))
			throw new AccountHandlingException("Invalid date");
		return d;
	}

}
