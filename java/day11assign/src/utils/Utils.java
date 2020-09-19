package utils;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.HashMap;
import java.util.Map;
import com.app.Book;
import java.io.ObjectOutputStream;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class Utils {

	public static ArrayList<Book> populateBooks() throws Exception {
		ArrayList<Book> al = new ArrayList<Book>();
		SimpleDateFormat sdf = new SimpleDateFormat("MM-DD-YYYY");
		al.add(new Book("java2", "abcd", 76.89, sdf.parse("5-8-2020"), "IT"));
		al.add(new Book("act1999", "bcd", 176.89, sdf.parse("5-8-2018"), "law"));
		al.add(new Book("ca1997", "bcded", 1766.89, sdf.parse("6-2-2013"), "ca"));
		al.add(new Book("act1999", "bcd", 176.89, sdf.parse("10-10-2019"), "bio"));
		
		return al;
	}
	
	public static boolean addtocart(LinkedList<Book> al) throws Exception {
		ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream("cart.ser"));
//		Map<String, Book> hm = new HashMap<String, Book>();
//		hm.put(al.getTitle(), al);
//		for(Book b: al) {
		System.out.println(al);
			os.writeObject(al);
		os.close();
		return true;
	}
	
	@SuppressWarnings("unchecked")
	public static LinkedList<Book> getcart() {
		try {
			ObjectInputStream os = new ObjectInputStream(new FileInputStream("cart.ser"));
//			System.out.println(os.readObject());
//			Book obj = (Book)os.readObject();
//			LinkedList<Book> ll = new LinkedList<Book>();
//			System.out.println(obj);
//			while(obj != null) {
//				ll.add(obj);
//				obj = (Book)os.readObject();
//			}
//			os.close();
			return new LinkedList<Book>((LinkedList<Book>)os.readObject());
		} catch (Exception e) {
			e.printStackTrace();
			return new LinkedList<Book>();
		}
	}
}
