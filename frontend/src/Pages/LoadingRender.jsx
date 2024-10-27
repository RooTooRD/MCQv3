// import React, { useEffect, useState } from 'react'
// import api from '../js/api'
// import MainContent from '../components/QuestionContent'
// import CurrentLoading from '../components/common/Loading'

// function LoadingRender({ children, url }) {

//   // states

//   const [loading, setLoading] = useState(true)
//   const [data, setData] = useState()

//   // functions

//   async function fetchData() {
//     try {
//       const response = await api.get(url)
//       setData(response.data)
//       setLoading(false)
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false)
//     }
//   }

//   // effects

//   useEffect(() => {
//     console.log(url)
//     fetchData()


//   }, [url])

  


//   return (
//     <>
//       {loading ? (
//         <CurrentLoading />
//       ) : (
//         <>
//           {React.Children.map(children, child =>
//             React.cloneElement(child, data)
//           )}
//         </>
//       )}
//     </>
//   );
// }

// export default LoadingRender


import React, { useState, useEffect } from "react";
import api from '../js/api'
import MainContent from '../components/QuestionContent'
import  LoadingPage from '../Pages/LoadingPage'


const LoadingRender = ({ url, children }) => {
  const [data, setData] = useState(null);  // Holds the fetched data
  const [loading, setLoading] = useState(true);  // Tracks loading state
  const [error, setError] = useState(null);  // Tracks any errors
  
  useEffect(() => {
    let isMounted = true;  // Used to track if the component is still mounted
    setLoading(true);      // Start loading
    setError(null);        // Reset error state
    setData(null);         // Clear previous data to prevent stale data

    const fetchData = async () => {
      try {
        const response = await api.get(url);
        if (isMounted) {
          setData(response.data);  // Update the data if component is still mounted
        }
      } catch (err) {
        if (isMounted) {
          setError(err);  // Capture the error if component is still mounted
        }
      } finally {
        if (isMounted) {
          setLoading(false);  // Stop loading once data or error has been set
        }
      }
    };

    fetchData();

    return () => {
      
      isMounted = false;  // Cleanup function to cancel the request if the component unmounts or re-renders
    };
  }, [url]);  // Re-run useEffect when `url` prop changes

  if (loading) {
    return <LoadingPage />  // You can customize this
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // You can customize this
  }
  
  return React.cloneElement(children, { data });  // Pass the fetched data to children
};

export default LoadingRender;
