package bin_io;

import java.util.Date;
import java.util.Scanner;

import com.app.bank.Account;
import static bin_utils.IOUtils.*;

public class TestRestoreData {

	public static void main(String[] args) {
		try(Scanner sc=new Scanner(System.in)) {
			System.out.println("Enter file name");
			System.out.println(readData(sc.next()));
			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
