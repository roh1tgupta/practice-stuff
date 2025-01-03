import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;

import com.app.assign.Customer;
import com.cust_except.CustomerException;
import com.cust_except.UtilValidation;

public class TesterWithHM {

	public static void main(String[] args) {
		HashMap<String, Customer> hm = new HashMap<String, Customer>();
		try {
			hm.put(UtilValidation.validateEmail("abcd@gmail.com"), new Customer(UtilValidation.validateEmail("abcd@gmail.com"), "rohit", 654, UtilValidation.validateDate("2-3-2019")));
			hm.put("abcde@gmail.com", new Customer(UtilValidation.validateEmail("abcde@gmail.com"), "rohitash", 653, UtilValidation.validateDate("2-6-2019")));
			hm.put("abcdr@gmail.com", new Customer(UtilValidation.validateEmail("abcdr@gmail.com"), "rohitg", 6546, UtilValidation.validateDate("2-8-2019")));
			hm.put("aaa@gmail.com", new Customer(UtilValidation.validateEmail("aaa@gmail.com"), "rohitg", 6546, UtilValidation.validateDate("2-2-2020")));			
			TreeMap<String, Customer> tm = new TreeMap<>(hm);
			TreeMap<String, Customer> tmr = new TreeMap<>(new Comparator<String>() {
				public int compare(String s1, String s2) {
					return s2.compareTo(s1);
				}
			});
			tmr.putAll(hm);
			System.out.println(hm);
			System.out.println(tm);
			System.out.println(tmr);
			Set<Entry<String, Customer>> es = hm.entrySet();
			ArrayList<Entry<String, Customer>> al = new ArrayList<>(es);
			
			Collections.sort(al, new Comparator<Entry<String, Customer>>() {
				@Override
				public int compare(Entry<String, Customer> s1, Entry<String, Customer> s2) {
					return (s1.getValue().getRegDate().getTime() - s2.getValue().getRegDate().getTime()) > 0 ? 1 : -1 ;
				}
			});
			
//			Collections.sort(al, new Comparator<Customer>() {
//				public int compare(Customer s1, Customer s2) {
//					return (s1.getRegDate().getTime() - s2.getRegDate().getTime()) > 0 ? 1 : -1 ;
//				}
//			});
			
			es.clear();
			System.out.println(es);
			
			System.out.println(al);
			
		
		} catch (CustomerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
