package test2Darr;

import java.util.Arrays;

class Test2DArray
{
	static void deepToString(int[][] arr) {
		for(int i =0; i< arr.length; i++) {
			for(int j = 0;j< arr[i].length; j++) {
				System.out.println(arr[i][j]);
			}
		}
	}
	
	public static void main(String[] args) 
	{
		//create symmetric 2 D array --of prim type -int
		int[][] data=new int[3][2];
		//fill in vals
		int counter=0;
		for(int i=0;i<data.length;i++) {
			for(int j=0;j<data[i].length;j++)
			  data[i][j]=++counter;
		}
		//display the same using Arrays.toString
		System.out.println(Arrays.toString(data));
		deepToString(data);
//	System.out.println(deepToString(data));

	System.out.println(data.getClass().getName());
	System.out.println(data[0].getClass().getName());

	}
}