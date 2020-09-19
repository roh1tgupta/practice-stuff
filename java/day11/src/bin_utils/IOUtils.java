package bin_utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import static com.app.bank.Account.*;

import com.app.bank.Account;

public class IOUtils {
	// add static method to write 1 a/c dtls to bin file in a buffered manner
	public static void writeData(Account a, String fileName) throws Exception {
		try (DataOutputStream out = new DataOutputStream(new BufferedOutputStream(new FileOutputStream(fileName)))) {
			// id
			out.writeInt(a.getAcctId());
			// nm
			out.writeUTF(a.getName());
			// type
			out.writeUTF(a.getType());
			// bal
			out.writeDouble(a.getBalance());
			// dt
			out.writeUTF(sdf.format(a.getLinkingDate()));
		}
	}

	// add static method to restore a/c info from bin file
	public static Account readData(String fileName) throws Exception {
		Account a1 = null;
		// file cls inst & validate
		File f1 = new File(fileName);
		if (f1.exists() && f1.isFile() && f1.canRead()) {
			try(DataInputStream in=new DataInputStream(new BufferedInputStream(new FileInputStream(f1))))
			{
				a1=new Account(in.readInt(),
						in.readUTF(), in.readUTF(), 
						in.readDouble(), sdf.parse(in.readUTF()));
			}
		}
		return a1;
	}

}
