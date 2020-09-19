package pkg;

public class Shifting {
	public static void main(String[] args) {
		byte a = 64, b;
	    int i;

	    i = a << 2;
	    b = (byte) (a << 2);

	    System.out.println("Original value of a: " + a);
	    System.out.println("i and b: " + i + " " + b);
	    
	    
	 // Left shifting as a quick way to multiply by 2.
	    int num = 0xFFFFFFE;
	    System.out.println("num "+ num);
	    for(i=0; i<4; i++) {
	      num = num << 1;
	      System.out.println("num "+num);
	    }
	    
	 // Masking sign extension.
	    System.out.println("masking sign extension");
	    char hex[] = {
	    	      '0', '1', '2', '3', '4', '5', '6', '7',
	    	      '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'
	    	    };
	    b = (byte) 0xf1;
	    System.out.println("b  "+b + "    "+ 0xf1);
	    System.out.println("b = 0x" + hex[(b >> 4) & 0x0f] + hex[b & 0x0f]);
	    
	 // Unsigned shifting a byte value.
	    System.out.println(" Unsigned shifting a byte value.");
	    b = (byte) 0xf1;
	    byte c = (byte) (b >> 4);
	    byte d = (byte) (b >>> 4);
	    byte e = (byte) ((b & 0xff) >> 4);

	    System.out.println("b "+b+"  c "+c+"  d "+d+"   e "+e);
	    System.out.println("              b = 0x"
	      + hex[(b >> 4) & 0x0f] + hex[b & 0x0f]);
	    System.out.println("         b >> 4 = 0x"
	      + hex[(c >> 4) & 0x0f] + hex[c & 0x0f]);
	    System.out.println("        b >>> 4 = 0x"
	      + hex[(d >> 4) & 0x0f] + hex[d & 0x0f]);
	    System.out.println("(b & 0xff) >> 4 = 0x"
	      + hex[(e >> 4) & 0x0f] + hex[e & 0x0f]);
	}
}
