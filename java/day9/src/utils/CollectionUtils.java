package utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import static utils.ValidationUtils.*;

import com.app.bank.Account;

public class CollectionUtils {
	public static List<Account> populateList() throws Exception
	{
		ArrayList<Account> l1=new ArrayList<>();
		l1.add(new Account("a1", "saving", 5000, validateDate("12-3-2017")));
		l1.add(new Account("z1", "current", 15000, validateDate("12-3-2017")));
		l1.add(new Account("b1", "fd", 5800, validateDate("12-9-2017")));
		l1.add(new Account("f1", "saving",65000, validateDate("1-1-2017")));
		Collections.shuffle(l1, new Random());
		return l1;
	}
}
