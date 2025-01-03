package pck;
import java.util.Scanner;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;

public class BufferedReaderWriter {

	public static void main(String[] args) {
//		Scanner sc = new Scanner(System.in);
		try(Scanner sc = new Scanner(System.in)) {
//			FileReader fr = new FileReader(sc.next());
//			FileReader fr = new FileReader("hello.txt");
			InputStreamReader fr = new InputStreamReader(System.in);
			BufferedReader br = new BufferedReader(fr);
			
//			FileWriter fw = new FileWriter(sc.next());
			FileWriter fw = new FileWriter("abc.txt");
			BufferedWriter bw = new BufferedWriter(fw);
			
			String str;
			str =  br.readLine();
			while(str != null) {
				System.out.println(str + "    " +str.length());
				bw.write(str, 0, str.length());
				bw.newLine();
				str =  br.readLine();
			}
			fr.close();
			fw.close();
//			br.close();
//			bw.close();
		} catch(IOException e) {
			e.printStackTrace();
		}
	}
}
