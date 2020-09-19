package char_io;

import java.util.Scanner;
import static utils.CollectionUtils.*;
import static utils.IOUtils.*;

public class TestStoreInfo {

	public static void main(String[] args) {
		try (Scanner sc = new Scanner(System.in)) {
			System.out.println("Enter file name to store data");
			String fileName = sc.next();
			writeData(getSortedAccts(populateMap()), fileName);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
