let obj1 = {
    user: {
            name: 'xyz',
            address: {
                    street: '123',
                    code: {
                            pincode: "201301"
                    }
            },
            employee: {
              type: 'private',
              nameOfOrg: 'xyz'
            }
    }
}

// function format(obj, parentKey = '') {  
//     let result = {}
//     for(let key in obj) {
//         let customKey = `${parentKey ? parentKey + '.' : ''}${key}`
//         if(typeof obj[key] === 'object' && Array.isArray(obj[key]) === false) {
//             result = {
//                 ...result,
//                 ...format(obj[key], customKey)
//             }
//         } else {
//             result[customKey] = obj[key]
//         }
//     }
//     return result;
// }
// console.log(format(obj1))


// function dest (obj) {
//     let result = {}
//     function abd(obj, key1 = '') {
//         const keys = Object.keys(obj);
//         keys.forEach((key) => {
//             if (typeof obj[key] === 'object' && Array.isArray(obj[key]) === false) {
//                 abd(obj[key], `${key1 ? key1 + '.' : ''}${key}`);
//             } else {
//                result = {
//                 ...result,
//                 [`${key1}.${key}`]: obj[key]
//                }
//             }
//         })
//     };
//     abd(obj)
// return result;
// }


// dest(obj1)


// let a = 1;
// b();
// function b() {
//     a = 10;
//     return;
//     function a() {}
// }
 
// console.log(a);