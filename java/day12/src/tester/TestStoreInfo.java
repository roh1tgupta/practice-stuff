package tester;
import static utils.CollectionUtils.*;
import static utils.IOUtils.*;

public class TestStoreInfo {

	public static void main(String[] args) {
		try {
			storeData(populateData());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
