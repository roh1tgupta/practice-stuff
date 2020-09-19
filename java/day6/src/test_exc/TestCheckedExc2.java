package test_exc;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOError;
import java.io.IOException;
import java.util.Scanner;

public class TestCheckedExc2 {

	public static void main(String[] args) throws Exception {
		Scanner sc = null;

		sc = new Scanner(System.in);
		System.out.println("Enter file name");
		FileReader fin = new FileReader(sc.next());
		System.out.println("end of try");
		fin.close();
		sc.close();

		System.out.println("main over");

	}

}
