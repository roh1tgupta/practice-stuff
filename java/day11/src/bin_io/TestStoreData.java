package bin_io;

import java.util.Date;
import java.util.Scanner;

import com.app.bank.Account;
import static bin_utils.IOUtils.*;

public class TestStoreData {

	public static void main(String[] args) {
		try(Scanner sc=new Scanner(System.in)) {
			System.out.println("Enter file name");
			Account a1=new Account(123, "abc", "saving", 5000, new Date());
			writeData(a1, sc.next());
			System.out.println("data written succesfully!");
			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
