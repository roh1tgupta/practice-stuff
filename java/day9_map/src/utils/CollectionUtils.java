package utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import static utils.ValidationUtils.*;

import com.app.bank.Account;

public class CollectionUtils {
	public static Map<Integer,Account> populateMap() throws Exception
	{
		HashMap<Integer,Account> hm=new HashMap<>();
		hm.put(1,new Account("a1", "saving", 5000, validateDate("12-3-2017")));
		hm.put(2,new Account("z1", "current", 15000, validateDate("12-3-2017")));
		hm.put(3,new Account("b1", "fd", 5800, validateDate("12-9-2017")));
		hm.put(4, new Account("f1", "saving",65000, validateDate("1-1-2017")));
		return hm;
	}
}
