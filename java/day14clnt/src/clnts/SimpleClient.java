package clnts;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.Socket;
import java.util.Scanner;

public class SimpleClient {

	public static void main(String[] args) {
		System.out.println("Enter server ip n server port"); // enter 127.0.0.1 and 5000
		try (Scanner sc = new Scanner(System.in); Socket client = new Socket(sc.next(), sc.nextInt())) {
			System.out.println("connected to Server IP " + client.getInetAddress().getHostName() + " server port  "
					+ client.getPort() + " local port " + client.getLocalPort());
			
			DataInputStream sin = new DataInputStream(client.getInputStream());
				DataOutputStream sout = new DataOutputStream(client.getOutputStream());
//				DataInputStream myin = new DataInputStream(System.in);
				
				System.out.println("clnt : attached data strms");
				//send req
				sout.writeUTF("Hello Server , how r u?");
				//display resp
				System.out.println("server sent : "+sin.readUTF());

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
