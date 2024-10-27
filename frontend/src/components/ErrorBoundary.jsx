import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI here
      return( 
        <div className='w-full h-full flex flex-col justify-center items-center'>
         <h2 className='h2'>Something went wrong.</h2>;
        <h2 className='h2'>):</h2>
         </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;