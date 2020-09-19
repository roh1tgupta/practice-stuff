package tester;

import static utils.IOUtils.*;

public class TestRestoreInfo {

	public static void main(String[] args) {
		try {
			System.out.println(restoreData());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
