import React from 'react';
import { FaCopyright, FaHeart } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gray-800 py-8">
    <div className="container mx-auto px-4 text-center text-gray-300">
      <p className="mb-2 text-lg">
        <FaCopyright className="inline-block mr-2 text-gray-400" />
        Copyright 2019. All rights reserved. Site by Lalit Kumar.
      </p>
      <p className="text-lg">
        Made with <FaHeart className="inline-block text-red-500 mx-1" />
      </p>
    </div>
  </footer>
);

export default Footer;
