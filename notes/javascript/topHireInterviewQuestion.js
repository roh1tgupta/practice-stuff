// flattens a nested object
// function des(obj) {
//     let output = {};
//     console.log(obj)
//     let keys =  Object.keys(obj);
//     keys.forEach((key) => {
//         if (typeof(obj[key]) === 'string') {
//             output[key] = obj[key];
//         } else {
//             let abc = des(obj[key])
//             Object.keys(abc).forEach(k2 => {
//                 output[`${key}.${k2}`] = abc[k2]
//             });
//         }
//     })
//     return output;
// }

// optimized

function des1(obj) {
    const output = {};

    const flatten = (ob, prefix = '') => {
        for(const [key, value] of Object.entries(ob)) {
            const ky = `${prefix ? `${prefix}.` : ''}${key}`
            if (typeof value === 'string') {
                output[ky] = value
            } else if (typeof value === 'object' && value !== null) {
                flatten(value, ky)
            }
        }
    }
    
    flatten(obj);
    return output;
}

let abcds = {
    a : {b :"c"},
    d: {e: {f: "g"}},
    h:{i:{j:{k:"l"}}},
    x: "y"
}
console.log(des1(abcds));


function add (...args) {
    let ab = [];
    if (args.length === 0){return 0}
    ab = ab.concat(args);
    const abc = (...args) => {
        if (args.length === 0) {
            return ab.reduce((acc, num) => acc + num, 0)
        } else {
            ab = ab.concat(args)
            return abc;
        }
    }
    return abc;
};


// console.log(add(1,2,4,89)());
// console.log(add(1,2)(3,4,5,6)());
// console.log(add(1,2)(3,4,5)(9,0)(7,8,9,7)());