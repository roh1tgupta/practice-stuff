package pck;

import java.io.*;
import java.util.Scanner;
public class DemoFile
{
 public static void main(String[] args) {
  try
   {
	  Scanner sc = new Scanner(System.in);
// create a inputstream object to read from a file
      FileInputStream in  = new FileInputStream(sc.next());
// create a outputstream object to write into a file
 	 FileOutputStream out = new FileOutputStream(sc.next());
     int v;
     while ((v = in.read()) != -1) {
    	 out.write(v);
         System.out.println(v); 
     }
     in.close();
     out.close();
	 } 
  catch (IOException io)
   {
	System.err.println("**An IO problem occurred " + io);
   }
  }
}
 
