package utils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.core.cdac.Product;
import com.core.cdac.ShipmentDetails;

public class CollectionUtils {
	public static Map<Integer, Product> populateData() {
		HashMap<Integer, Product> products = new HashMap<>();
		System.out.println(products.put(10, new Product(10, 100, "desc1", "catgeory1", 200)));
		System.out.println(products.put(1, new Product(1, 10, "desc1", "catgeory1", 400)));
		System.out.println(products.put(25, new Product(25, 200, "desc2", "catgeory1", 100)));
		System.out.println(products.put(1, new Product(1, 100, "desc3", "catgeory2", 500)));
		// create shipping details
		List<ShipmentDetails> l1 = Arrays.asList(new ShipmentDetails("pu", "mh", "in"),
				new ShipmentDetails("mumbai", "mh", "in"), new ShipmentDetails("NY", "NY", "USA"));
		// assign them
		int i = 0;
		for (Product p : products.values())
			p.setDetails(l1.get(i++));
		System.out.println(products);
		return products;

	}
}
