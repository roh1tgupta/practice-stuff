class myArray {
	constructor() {
		this.array = [];
	}
	
	add(data) {
		this.array.push(data);
	}
	
	remove(data) {
		this.array = this.array.filter(current => current != data);
	}
	
	search(data) {
		const index = this.array.indexOf(data);
		if(index) {
			return index;
		}
		
		return null;
	}
	
	getAtPos(index) {
		return this.array[index];
	}
	
	getLength() {
		return this.array.length;
	}
	
	printArray() {
		console.log(this.array.join(','));
	}
}


const array = new myArray();
array.add(1);
array.add(5);
array.add(9);
array.add(10);
array.add(20);
array.add(11);
array.add(16);
array.add(19);
array.add(29);
array.printArray();
console.log('array[2] = ',array.getAtPos(2));
console.log('search 5 ',array.search(5));
array.remove(29);
array.printArray();

module.export = myArray;
