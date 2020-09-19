package utils;


import java.util.HashMap;
import java.util.Map;
import static utils.ValidationUtils.*;
import com.app.bank.Account;

public class CollectionUtils {
	public static Map<Integer,Account> populateMap() throws Exception
	{
		HashMap<Integer,Account> hm=new HashMap<>();
		hm.put(10,new Account(10,"a1", "saving", 5000, validateDate("12-3-2017")));
		hm.put(200,new Account(200,"z1", "current", 15000, validateDate("12-3-2017")));
		hm.put(30,new Account(30,"b1", "fd", 5800, validateDate("12-9-2017")));
		hm.put(44, new Account(44,"f1", "saving",65000, validateDate("1-1-2017")));
		return hm;
	}
}
