import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ProgressSpinner 
        style={{ width: '50px', height: '50px' }} 
        strokeWidth="8"
        animationDuration="1s"
        className="text-primary-500"
      />
      <span className="text-lg text-gray-600">Loading artworks...</span>
      <div className="text-sm text-gray-500 text-center">
        Data provided by the Art Institute of Chicago API
      </div>
    </div>
  );
};

export default Loading;