package utils;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Map;

import com.core.cdac.Product;

public class IOUtils {
	public static void storeData(Map<Integer, Product> hm) throws Exception {
		try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("products.ser"))) {
			out.writeObject(hm);
			System.out.println("data write over....");
		}
	}

	@SuppressWarnings("unchecked")
	public static Map<Integer, Product> restoreData() throws Exception {
		try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("products.ser"))) {
			return (Map<Integer, Product>) in.readObject();
		}

	}

}
