package maps;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.print.attribute.standard.Destination;

import static utils.ValidationUtils.*;
import static utils.CollectionUtils.*;

import com.app.bank.Account;

import cust_excs.AccountHandlingException;

public class AccountMap {

	public static void main(String[] args) throws Exception {
		Scanner sc = new Scanner(System.in);

		try {
			// Create empty HashMap of suitable type
			Map<Integer, Account> accts = populateMap();
			boolean exit = false;
			while (!exit) {
				System.out.println("1 : Create A/C \n" + "2 : Display all accounts info \n" + "3 : Get A/C Summary \n"
						+ "4 : Close A/C \n" + "99 : Exit\n");
				System.out.println("Enter your option");
				try {
					switch (sc.nextInt()) {
					case 1: // create a/c
						System.out.println("Enter a/c details nm type bal date");
						Account a1 = new Account(sc.next(), sc.next(), sc.nextDouble(), validateDate(sc.next()));
						accts.put(a1.getAcctId(), a1);
						break;
					case 2: // display all acct info
						System.out.println(accts.size());
						System.out.println(accts);

						break;
					case 3: // display summary or err mesg
						System.out.println("Enter a/c id");
						int id = sc.nextInt();
						if (accts.containsKey(id))
							System.out.println(accts.get(id));
						else
							throw new AccountHandlingException("Invalid A/C ID!!!");
						break;
					case 4: // close a/c
						System.out.println("Enter a/c id to close a/c");
						id = sc.nextInt();
						if(accts.containsKey(id))
							System.out.println("A/c Closed details : "+accts.remove(id));
						else
							throw new AccountHandlingException("A/C closing failed ---Invalid A/C ID!!!");	
						break;
					case 5: // funds transfer
						System.out.println("Enter src id ,dest id , amt to transfer");
						id=sc.nextInt();
						int destId=sc.nextInt();
						double amt=sc.nextDouble();
						//validate src a/c
						if(!accts.containsKey(id))
							throw new AccountHandlingException("Invalid Src A/C ID!!!");
						if(!accts.containsKey(destId))
							throw new AccountHandlingException("Invalid Dest A/C ID!!!");
						accts.get(id).transferFunds(accts.get(destId), amt);
						break;

					case 99:
						exit = true;
						break;
					}
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
		} finally {
			if (sc != null)
				sc.close();
		}

	}

}
