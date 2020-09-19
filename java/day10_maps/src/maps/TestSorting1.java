package maps;
import static utils.CollectionUtils.*;

import java.util.Map;
import java.util.TreeMap;

import com.app.bank.Account;

import cust_comp.AccountDescIdComp;
public class TestSorting1 {

	public static void main(String[] args) {
		try {
			Map<Integer, Account> hm=populateMap();
			System.out.println(hm);
			//Sort a/cs (existing in a map) as per asc order of ids
			TreeMap<Integer, Account> tm1=new TreeMap<>();
			tm1.putAll(hm);
			System.out.println("Sorted map via 1st constr "+tm1);
			TreeMap<Integer, Account> tm2=new TreeMap<>(hm);
			System.out.println("Sorted map via 3rd constr "+tm2);
			//Sort a/cs (existing in a map) as per desc order of ids
			TreeMap<Integer, Account> tm3=new TreeMap<>(new AccountDescIdComp());
			tm3.putAll(hm);
			System.out.println(tm3);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
