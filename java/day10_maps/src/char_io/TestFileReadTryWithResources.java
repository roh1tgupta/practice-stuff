package char_io;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Scanner;

public class TestFileReadTryWithResources {

	public static void main(String[] args) throws Exception {

		try (Scanner sc = new Scanner(System.in);
				BufferedReader br = new BufferedReader(new FileReader(sc.nextLine()))) {
			System.out.println("Enter file name to read");
			String line = null;
			while ((line = br.readLine()) != null)
				System.out.println(line);
			System.out.println("end of read");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
