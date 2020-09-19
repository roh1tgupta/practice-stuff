package utils;

import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;
import static com.app.bank.Account.*;

import com.app.bank.Account;

public class IOUtils {
	public static void writeData(List<Account> l1, String fileName) throws Exception {
		try (PrintWriter pw = new PrintWriter(new FileWriter(fileName))) {
			for (Account a : l1)
				pw.println(a);

		}
	}

	public static List<Account> readData(String fileName) throws Exception {
		// create empty LL
		LinkedList<Account> l1 = new LinkedList<>();
		// create file class inst & validate
		File f1 = new File(fileName);
		if (f1.exists() && f1.isFile() && f1.canRead()) {
			// attach data strm --sc wrapping file cls inst
			try (Scanner sc = new Scanner(f1)) {
				while (sc.hasNextLine()) {
					l1.add(new Account(sc.nextInt(), sc.next(), sc.next(), sc.nextDouble(), sdf.parse(sc.next())));
					sc.nextLine();
				}
			}
		}
		return l1;

	}

}
