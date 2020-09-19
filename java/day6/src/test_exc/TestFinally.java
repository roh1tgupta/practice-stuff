package test_exc;



public class TestFinally {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		System.out.println("1");
		try {
			testMe();
			System.out.println("back in main");
		} catch (Exception e) {
			System.out.println("err " + e + "\n msg : " + e.getMessage());
		} finally {
			System.out.println("in main's finally");
		}
		System.out.println("main over..");

	}

	private static void testMe() throws Exception {
		try {
			System.out.println("in try");
			String[] ss = { "aa", "bb" };
			Thread.sleep(1234);
			System.out.println(ss[2]);
	/*		System.out.println("Press enter to continue...");
			System.in.read();
	*/		boolean flag = true;
			if (flag)
				return;
			System.out.println("end of try");
		} finally {
			System.out.println("in meth's finally");
		}
		System.out.println("meth end");
	}

}
