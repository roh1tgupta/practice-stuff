package drawing.basic;
import java.util.Scanner;

public class Point2D {
	double x;
	double y;
	Point2D(double x, double y) {
		this.x = x;
		this.y = y;
	}
	
	String show() {
	return this.x + "   " + this.y;	
	}
	
	double getxcrd() {
		return this.x;
	}
	
	double getycrd() {
		return this.y;
	}
	
	boolean isEqual(double x, double y) {
		return this.x == x && this.y ==y;
	}
	
	Point2D createNewPoint(double xoffset,double yoffset) {
		return new Point2D(this.x + xoffset, this.y + yoffset);
	}
	
	double calcDistance(Point2D p2) {
		double dist = Math.pow((this.x - p2.getxcrd()), 2) + Math.pow((this.y - p2.getycrd()), 2);
		dist =  Math.pow(dist, 0.5);
		return dist;
	}
}

class TestPoints {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("please enter the x coordinate and y coordinate");
		double x = sc.nextDouble();
		double y = sc.nextDouble();
		
		Point2D pt = new Point2D(x, y);
		Point2D refPt = new Point2D(0, 0);
		System.out.println("you enetered x and y : " + pt.show());
		System.out.println("reference points : " + refPt.show());
		System.out.println("equality with origin: " + pt.isEqual(refPt.getxcrd(), refPt.getycrd()));
		
		System.out.println("distance with origin: " + pt.calcDistance(refPt));
		
		System.out.println("equality of reference pt with origin: " + refPt.isEqual(0, 0));
		
		
	}
}