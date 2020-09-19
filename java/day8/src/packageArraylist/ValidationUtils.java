package packageArraylist;
import java.util.Date;
import static packageArraylist.Accounts.*;

public class ValidationUtils {
	// public static methods --- validation rules
		public static String validateName(String name) throws Exception {
			if (name.length() < 4 || name.length() > 14)
				throw new AccountHandlingException("Invalid cusotmer name....");
			return name;

		}

		public static String validateType(String type) throws Exception {
			switch (type.toUpperCase()) {
			case "SAVING":
			case "CURRENT":
			case "FD":
				break;

			default:
				throw new AccountHandlingException("Unsupported a/c type...");
			}
			return type;
		}

		public static double validateBalance(double bal) throws AccountHandlingException {
			if (bal < MIN_BALANCE)
				throw new AccountHandlingException("Insufficient opening bal ");
			return bal;
		}
		
//		public static void validateId(int id) throws AccountHandlingException {
//			if (id < 0 && id > idGenerator)
//				throw new AccountHandlingException("invaid id");
//		}

		public static Date validateDate(String s) throws Exception {
			// parse
			Date d = sdf.parse(s);
			// validate range
			if (d.after(endDate))
				throw new AccountHandlingException("Invalid date");
			return d;
		}

}
