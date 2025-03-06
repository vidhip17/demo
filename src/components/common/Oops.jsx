import React, { useEffect, useState } from 'react';

const Oops = () => {
//   const [dogImage, setDogImage] = useState('');

//   useEffect(() => {
//     fetch('../../images/images.jpg')
//       .then((response) => response.json())
//       .then((data) => {
//         setDogImage(data.message); 
//       })
//       .catch((error) => {
//         console.error('Error fetching dog image:', error);
//       });
//   }, []);

  return (
    <div className='d-flex justify-content-center flex-column align-items-center'>
      <h1>Oops! You are not authorized.</h1>
      <p>Please login to continue.</p>
      <img src="/images/images.jpg" alt="Random Dog" style={{ width: '300px', height: 'auto', borderRadius: '10px' }} />
    </div>
  );
}

export default Oops;
