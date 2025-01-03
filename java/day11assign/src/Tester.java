import static utils.Utils.*;
import java.util.ArrayList;
import java.util.LinkedList;
import com.app.Book;
import java.util.Scanner;

public class Tester {
	public static void main(String [] args) {
		try(Scanner sc = new Scanner(System.in)) {
			ArrayList<Book> al = new ArrayList<Book>(populateBooks());
			LinkedList<Book> cart = new LinkedList<Book>(getcart());
			System.out.println("books available by title");
			for(Book b: al) {
				System.out.println(b.getTitle());
			}
			boolean flag = false;
			while(!flag) {
				System.out.println("1  Add book to cart \n2  remove book from cart\n"
						+ "3  show cart content\n4  checkout");
				int option = sc.nextInt();
				String title = "";
				switch(option) {
				case 1: {
					System.out.println("enter the title");
					title = sc.next();
					for(Book b: al) {
						if (b.getTitle().equals(title)) {
							cart.add(b);
							break;
						}
					}
					break;
				}
				case 2:
					System.out.println("enter the title");
					title = sc.next();
					for(Book b: cart) {
						if (b.getTitle().equals(title)) {
							System.out.println("hello inside");
							cart.remove(b);
							break;
						}
					}
					break;
				case 3:
					System.out.println("books added to cart");
					Double price = 0.0;
					for(Book b: cart) {
						price += b.getPrice();
						System.out.println("title: "+b.getTitle()+ ", price: "+b.getPrice());
					}
					System.out.println("total price: "+price);
					break;
				case 4:
					System.out.println("books added to cart");
					price = 0.0;
					for(Book b: cart) {
						price += b.getPrice();
						System.out.println("title: "+b.getTitle()+ ", price: "+b.getPrice());
					}
					System.out.println("total price: "+price);
					addtocart(cart);
					flag = true;
					break;
				}
				
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
