package packageArraylist;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;


//@SuppressWarnings("rawtypes")
public class Accounts implements Comparable<Accounts>{
	private int acctId;
	private String name, type;
	private double balance;
	private Date linkingDate;
	// id gen
	private static int idGenerator;
	// parser(S-->Date) n formatter(Date ---String)
	public static SimpleDateFormat sdf;
	public static final double MIN_BALANCE;
	public static Date endDate;
	static {
		MIN_BALANCE = 1000;
		try {
			// init sdf
			sdf = new SimpleDateFormat("dd-MM-yyyy");
			endDate = sdf.parse("31-3-2020");
		} catch (ParseException e) {
			System.out.println("err in static init block " + e);
		}
	}

	// constructor
	public Accounts(String name, String type, double bal, Date d1) {
		this.name = name;
		this.type = type;
		balance = bal;
		linkingDate = d1;
		acctId = ++idGenerator;
	}
	
	public Accounts(int acctId) {
		super();
		this.acctId = acctId;
	}

	public Date getLinkingDate() {
		return this.linkingDate;
	}
	
	public double getBalance() {
		return this.balance;
	}
	
	public int getId() {
		return this.acctId;
	}

	@Override
	public String toString() {
		return "A/C Summary " + acctId + " " + name + " " + type + " " + balance + " linked on"
				+ sdf.format(linkingDate) + " interest"+getInterest();
	}

	public void deposit(double amt) {
		balance += amt;
	}

	public void withdraw(double amt) throws Exception {
		if ((balance - amt) < MIN_BALANCE)
			throw new AccountHandlingException("Insufficeint funds : Withdraw failed!!!!");
		balance -= amt;
	}

	public void transferFunds(Accounts dest, double amt) throws Exception {
		this.withdraw(amt);
		dest.deposit(amt);
	}
	@Override
	public boolean equals(Object o)
	{
		System.out.println("in acct's equals");
		if(o != null && o instanceof Accounts)
			return acctId == ((Accounts)o).acctId;
		return false;
	}
	
	public double getInterest() {
		 DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy");  
		 LocalDateTime now = LocalDateTime.now();
 
		 SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		 Date today;
		try {
			today = sdf.parse(dtf.format(now));
			 long diff = today.getTime() - this.linkingDate.getTime();
			 double days = (double)diff / (1000*60*60*24);
			 double years = days/365;
			 double interest = (years * this.balance * 4.5) / 100;
			   
			 return interest;
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0;		
	}

//	@Override
//	public int compareTo(Object act) {
//		if (act != null && act instanceof Accounts)
//		return this.acctId < ((Accounts)act).acctId ? -1 : (this.acctId == ((Accounts)act).acctId ? 0 : 1);
//	}

	@Override
	public int compareTo(Accounts act) {
		// TODO Auto-generated method stub
		return this.acctId < act.acctId ? -1 : (this.acctId == act.acctId ? 0 : 1);
	}
}
