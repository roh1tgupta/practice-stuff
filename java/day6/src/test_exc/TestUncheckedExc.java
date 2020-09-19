package test_exc;

public class TestUncheckedExc {

	public static void main(String[] args) {
		try {
			String ss = "1234";
			System.out.println(Integer.parseInt(ss));
			int a = 100;
			int b =10;
			System.out.println("res=" + (a / b));
			Object o="abcd";//upcasting
			o=null;
			System.out.println(o.hashCode());
//			Integer i1=(Integer) o;
//			System.out.println(i1);
			System.out.println("end of try");
		} catch (NumberFormatException e) {
			//error mesg
			System.out.println(e.getMessage());
		} catch (ArithmeticException | NullPointerException e) {
			//name & dtls
			
			System.out.println("inside nullpointerexception "+e);
		}
		catch (Exception e) {
			// 3 name , detailed mesg , loc dtls
			e.printStackTrace();
		}
		System.out.println("main over...");

	}

}
