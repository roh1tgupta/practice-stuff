package utils;

import java.util.HashMap;
import java.util.Map;

import com.app.core.User;

public class CollectionUtils {
   public static Map<String,User> populateData() 
   {
	   HashMap<String, User> users=new HashMap<>();
	   users.put("a@gmail", new User("a@gmail","1234","cust",500));
	   users.put("b@gmail", new User("b@gmail","1235","admin",1500));
	   return users;
	   
   }
}
