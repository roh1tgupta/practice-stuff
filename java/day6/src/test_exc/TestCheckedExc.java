package test_exc;

import java.io.FileReader;
import java.util.Scanner;

public class TestCheckedExc {

	public static void main(String[] args) {
		Scanner sc=null;
		try {
			sc = new Scanner(System.in);
			System.out.println("Enter file name");
			FileReader fin = new FileReader(sc.next());
			System.out.println("end of try");
			fin.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		sc.close();
		
		System.out.println("main over");

	}

}
