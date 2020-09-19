package meth_override_exc_handling;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.ConnectException;

public class A {
	void show() throws IOException
	{
		
	}
}
class B extends A
{
	@Override
	void show() throws ConnectException,NullPointerException
	{
		
	}
}
