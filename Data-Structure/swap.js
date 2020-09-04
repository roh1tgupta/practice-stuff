class swap {
	constuctor() {
	}
	
	swapWithThirdVariable(a, b) {
		console.log('swapWithThirdVariable');
		console.log('before swap a = ',a,', b = ',b);
		let temp = a;
		a = b;
		b = temp;
		console.log('after swap a = ',a,', b = ',b);
	}
	
	/*
	problems with below methods
	 The multiplication and division based approach doesn’ work if one of the numbers is 0 as the product becomes 0 irrespective of the other number.

	 Both Arithmetic solutions may cause arithmetic overflow. If x and y are too large, addition and multiplication may go out of integer range.
	
	 When we use pointers to variable in c,c++ and make a function swap, all of the below methods fail when both pointers point to the same variable.
	 
	 Bitwise XOR based method
		x = x ^ x; // x becomes 0
		x = x ^ x; // x remains 0
		x = x ^ x; // x remains 0

	 Arithmetic based method
		x = x + x; // x becomes 2x
		x = x – x; // x becomes 0
		x = x – x; // x remains 0

	*/
	swapWithAddition(a, b) {
		console.log('swapWithAddition');
		console.log('before swap a = ',a,', b = ',b);
		a = a+b;
		b = a-b;
		a = a-b;
		console.log('after swap a = ',a,', b = ',b);
	}
	
	swapWithMultipication(a, b) {
		console.log('swapWithMultipication');
		console.log('before swap a = ',a,', b = ',b);
		a = a*b;
		b = a/b;
		a = a/b;
		console.log('after swap a = ',a,', b = ',b);
	}
	
	swapWithXor(a, b) {
		console.log('swapWithXor');
		console.log('before swap a = ',a,', b = ',b); 
		a = a ^ b;
		b = a ^ b;
		a = a ^ b;
		console.log('after swap a = ',a,', b = ',b);
	}
}

const swp = new swap();

let a = 5;
let b = 10;
swp.swapWithThirdVariable(a, b);
swp.swapWithAddition(a, b);
swp.swapWithMultipication(a, b);
swp.swapWithXor(a, b);