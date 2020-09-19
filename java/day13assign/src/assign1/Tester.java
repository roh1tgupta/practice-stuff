package assign1;

public class Tester {

	public static void main(String[] args) {
		try {
			EvenNoPrint t1 = new EvenNoPrint("evennothread", 100, 120);
			OddNoPrint t2 = new OddNoPrint("oddnothread", 51, 80);
			Thread t3 = new Thread(new EvenImple(2, 20), "evenimple");
			Thread t4 = new Thread(new EvenImple(7, 49), "oddimple");
			t3.start();
			t4.start();
			t1.join();
			t2.join();
			t3.join();
			t4.join();
			System.out.println("Main ends");
		} catch(Exception e) {
			e.printStackTrace();
		}

	}
}
