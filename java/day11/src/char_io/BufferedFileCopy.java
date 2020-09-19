package char_io;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Scanner;

public class BufferedFileCopy {

	public static void main(String[] args) {
		System.out.println("Enter src n dest files names");
		try (Scanner sc = new Scanner(System.in);
				// br
				BufferedReader br = 
						new BufferedReader
						(new FileReader(sc.next()));
				// pw
				PrintWriter pw = 
						new PrintWriter
						(new FileWriter(sc.next(), true), true);) {
			//read --write
			String s=null;
			while((s=br.readLine())!= null)
				pw.println(s);
			System.out.println("file copy over...");

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
