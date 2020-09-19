package char_io;

import java.io.File;
import java.util.Scanner;

public class TestScannerFileRead {

	public static void main(String[] args) {
		try(Scanner sc1=new Scanner(System.in);)
		{
			System.out.println("Enter file name to read data");
			File f1=new File(sc1.next());
			if(f1.exists() && f1.isFile() && f1.canRead())
			{
				//existing , readable data file
				try(Scanner sc2=new Scanner(f1))
				{
					while(sc2.hasNextLine())
						System.out.println(sc2.nextLine());
					System.out.println("file read over...");
				}
			} else
				System.out.println("Invalid file.....");
		}catch (Exception e) {
			e.printStackTrace();
		}

	}

}
