package char_io;

import java.util.Scanner;
import static utils.IOUtils.*;

public class TestRestoreInfo {

	public static void main(String[] args) {
		try (Scanner sc = new Scanner(System.in)) {
			System.out.println("Enter file name");
			System.out.println(readData(sc.next()));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
