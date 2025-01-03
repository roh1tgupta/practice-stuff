package pck;
import java.io.*;
import java.util.Scanner;
public class ReaderWriter {
	public static void main (String[] args) {
		Scanner sc =  new Scanner(System.in);
		try {
			
			FileReader input = new FileReader(sc.next());
			FileWriter output = new FileWriter(sc.next());
//			char[] buffer = new char[] {1, 2};
//			char[] buffer = new char[] {1};
//			char[] buffer = new char[] {};
			char[] buffer = new char[4];
//			String buffer;
			int charsRead;
			charsRead = input.read(buffer);		//Read first buffer
			while (charsRead != -1) {
			output.write(buffer, 0, charsRead);   //Write buffer to output file
			String str = new String(buffer);
			System.out.println(str+"............"+charsRead);
			charsRead = input.read(buffer);		//Read the next buffer
			}
			input.close ();
			output.close ();
		}catch (IOException ioe) {
			ioe.printStackTrace ();  
		}finally {
			sc.close();
		}
	}
}