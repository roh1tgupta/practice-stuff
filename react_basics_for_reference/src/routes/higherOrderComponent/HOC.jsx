import React from 'react';

const carJson = {name: 'car', tyres: '4', price: '8l'};
const bikeJson = {name: 'bike', tyres: '2', price: '80k'};

// const HOC = originalProps => (Component, type) => {
//     return class extends React.Component {
//         constructor(props) {
//             super(props);
//         }
        
//         render() {
//           console.log('..........', type);
//           let props = null;
//           if (type === 'car') {
//             props = carJson;
//           } else {
//             props = bikeJson;
//           }
//             return <Component {...props} {...originalProps} />
//         }
//     }
// };

// export default HOC;

export default function HOC(Component, type) {
    return class extends React.Component {
      // If you don’t initialize state and you don’t bind methods, you don’t need to implement
      // a constructor for your React component.
        // constructor(props) {
        //     super(props);
        // }

        render() {
          console.log('..........', type, "this.props", this.props);
          let props = null;
          if (type === 'car') {
            props = carJson;
          } else {
            props = bikeJson;
          }
            return <Component {...props} {...this.props} />
        }
    }
}