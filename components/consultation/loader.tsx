import React from 'react';

export default function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center z-200 bg-white/50 fixed top-0 left-0">
      <div className="w-10 h-10 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
}
