package char_io;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Scanner;

public class TestFileRead {

	public static void main(String[] args) throws Exception{
		Scanner sc=new Scanner(System.in);
		BufferedReader br=null;
		try {
			System.out.println("Enter file name to read");
			br=new BufferedReader(new FileReader(sc.nextLine()));
			String line=null;
			while((line=br.readLine()) != null)
				System.out.println(line);
			System.out.println("end of read");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(br != null)
				br.close();
			if(sc != null)
				sc.close();
			
		}

	}

}
