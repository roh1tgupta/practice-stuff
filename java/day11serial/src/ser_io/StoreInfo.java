package ser_io;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import static utils.CollectionUtils.*;

public class StoreInfo {

	public static void main(String[] args) {
		// write HM of accts to bin file
		try (ObjectOutputStream out = 
				new ObjectOutputStream(new FileOutputStream
						("accts.ser"))) {
			out.writeObject(populateMap());
			System.out.println("data write over...");

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
