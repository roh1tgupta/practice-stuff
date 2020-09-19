package ser_io;

import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class RestroeInfo {

	public static void main(String[] args) {
		// restore HM from ser bin strm -- de-serialization
		try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("accts.ser"))) {
			System.out.println("Restored map "+in.readObject());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
