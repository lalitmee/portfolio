import React from 'react';
import Link from 'next/link';

const Resume = () => (
  <div className="py-20 bg-gray-50" id="resume">
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center mb-12 text-gray-800">Resume</h2>
      <hr className="w-1/4 mx-auto mb-12 border-t-2 border-teal-500" />
      <div className="flex justify-center">
        <Link href="/resume" className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">
            View Resume
        </Link>
      </div>
    </div>
  </div>
);

export default Resume;
