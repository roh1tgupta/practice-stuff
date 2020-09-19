package pck;
import java.io.*;
import java.util.Date;

public class SerializeDate {
	public SerializeDate () {
		Date d = new Date ();
		try {
//			OutputStreamWriter o = new OutputStreamWriter("rohit.txt");
			FileOutputStream f = new FileOutputStream ("rohit.txt");
			ObjectOutputStream s = new ObjectOutputStream (f);
			s.writeObject (d);
			s.close ();
		}catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static void main (String[] args) {
		SerializeDate s = new SerializeDate ();
	}	}
