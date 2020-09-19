package packageArraylist;

import java.util.ArrayList;

public class IntergerArrayList {

	public static void main(String[] args) {
		ArrayList<Integer> li = new ArrayList<Integer>(10);
		
		System.out.println("size of the list: "+li.size());
		for(int i=0;i<15;i++) {
			li.add(i);
		}
		System.out.println("size of the list: "+li.size());
		System.out.println("is 5 in the list: "+li.contains(5));
		
		System.out.println("replacing element at index 4: "+li.set(4, 7));
		
		System.out.println("index of 7 in the list: "+li.indexOf(7));
		
		System.out.println("last index of 7 in the list: "+li.lastIndexOf(7));
		
		System.out.println("remove object: "+li.remove((Integer)4));
		
		System.out.println("remove object: "+li.remove((Integer)7));
		
		System.out.println("index of 7 in the list: "+li.indexOf(7));
		
		System.out.println("remove element at 4th index: "+li.remove(4));

		System.out.println("get element at 4th index: "+li.get(4));
		
//		System.out.println("get element at 4th index: "+li.get(20));
		
//		for(Integer i: li) {
//			System.out.println(i);
//		}
		
		for(Integer i: li) {
				System.out.println("i is "+i+" and i*2: "+i*2);
				li.set(li.indexOf(i), i * 2);
				System.out.println(li.toString());
		}
		
		for(Integer i : li) {
			System.out.println(i);
		}
		
	}
}
