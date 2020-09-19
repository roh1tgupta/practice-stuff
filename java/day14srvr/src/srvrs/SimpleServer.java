package srvrs;

import java.net.ServerSocket;
import java.net.Socket;
import java.io.DataInputStream;
import java.io.DataOutputStream;

public class SimpleServer {
	public static final int SERVER_PORT = 5000;

	public static void main(String[] args) {
		System.out.println("Waiting for clnt....");
		try (ServerSocket ss = new ServerSocket(SERVER_PORT, 1); 
				Socket connection = ss.accept();) {
			System.out.println("cn accepted from clnt IP "+connection.getInetAddress().getHostName()+" clnt port "
				+connection.getPort()+" local port "+connection.getLocalPort());
	           DataInputStream sin = new DataInputStream(connection.getInputStream());
	           DataOutputStream sout = new DataOutputStream(connection.getOutputStream());
//	            DataInputStream myin = new DataInputStream(System.in); 

				//read request
				System.out.println("clnt sent : "+sin.readUTF());
				//send resp
				sout.writeUTF("I m good , bye for now.....");

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
