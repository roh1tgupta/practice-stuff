// Starting from Node.js v7.0.0, the punycode module has been deprecated 
// as part of the core API and is now separate from Node.js. 
// If you're using a modern version of Node.js (v7+), you need to install
//  the punycode package separately via npm


const punycode = require('punycode/');

const unicodeDomain = 'münich.com';
const punycodeDomain = punycode.toASCII(unicodeDomain);
console.log(punycodeDomain); // Output: 'xn--mnich-kva.com'

const decodedDomain = punycode.toUnicode(punycodeDomain);
console.log(decodedDomain); // Output: 'münich.com'

console.log(punycode.version)



// Converts a Punycode string of ASCII symbols to a string of Unicode symbols.
console.log(punycode.decode('maana-pta')); // 'mañana'
console.log(punycode.decode('--dqo34k')); // '☃-⌘'




// Converts a string of Unicode symbols to a Punycode string of ASCII symbols.
console.log(punycode.encode('mañana'))// 'maana-pta'
console.log(punycode.encode('☃-⌘'),  "   line#29"); // '--dqo34k'


// Converts a Punycode string representing a domain name or an email address to Unicode. 
// Only the Punycoded parts of the input will be converted, i.e. it doesn’t matter if
//  you call it on a string that has already been converted to Unicode.
// decode domain names
console.log(punycode.toUnicode('xn--maana-pta.com'), "......line# 36")
// → 'mañana.com'

console.log(punycode.toUnicode('xn----dqo34k.com'), "..........line #39")
// → '☃-⌘.com'

// decode email addresses
console.log(punycode.toUnicode('джумла@xn--p-8sbkgc5ag7bhce.xn--ba-lmcq'), "..line #43");
// → 'джумла@джpумлатест.bрфa'




// Converts a lowercased Unicode string representing a domain name or an email 
// address to Punycode. Only the non-ASCII parts of the input will be converted, 
// i.e. it doesn’t matter if you call it with a domain that’s already in ASCII.
// encode domain names
console.log(punycode.toASCII('mañana.com'))
// → 'xn--maana-pta.com'
console.log(punycode.toASCII('☃-⌘.com'))
// → 'xn----dqo34k.com'

// encode email addresses
console.log(punycode.toASCII('джумла@джpумлатест.bрфa'), "...line #59")
// → 'джумла@xn--p-8sbkgc5ag7bhce.xn--ba-lmcq'




// punycode.ucs2.decode(string)
// Creates an array containing the numeric code point values of each Unicode symbol 
// in the string. While JavaScript uses UCS-2 internally, this function will convert a 
// pair of surrogate halves (each of which UCS-2 exposes as separate characters) into a
//  single code point, matching UTF-16.

console.log(punycode.ucs2.decode('abc'), "...line #71")
// → [0x61, 0x62, 0x63] 0x61 is hexadecimal of 97
// surrogate pair for U+1D306 TETRAGRAM FOR CENTRE:
console.log(punycode.ucs2.decode('\uD834\uDF06'))
// → [0x1D306]  119558 (in decimal) is the same as 0x1D306 (in hexadecimal)



// Creates a string based on an array of numeric code point values.
console.log(punycode.ucs2.encode([0x61, 0x62, 0x63]));
// → 'abc'
console.log(punycode.ucs2.encode([0x1D306]))
// → '\uD834\uDF06'