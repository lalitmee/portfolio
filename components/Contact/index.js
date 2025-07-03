import React from "react";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa";
import Map from "../Map";

const Contact = () => (
  <div className="py-20 bg-gray-50" id="contact">
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center mb-12 text-gray-800">
        Contact
      </h2>
      <hr className="w-1/4 mx-auto mb-12 border-t-2 border-teal-500" />
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col justify-center">
            <div className="flex items-center mb-8 space-x-6">
              <a
                href="https://www.linkedin.com/in/lalitmee/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                <FaLinkedin size={40} />
              </a>
              <a
                href="https://www.github.com/lalitmee/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
              >
                <FaGithub size={40} />
              </a>
              <a
                href="https://www.facebook.com/iamlalitmee"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                <FaFacebook size={40} />
              </a>
              <a
                href="https://www.twitter.com/lalitmee/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
              >
                <FaTwitter size={40} />
              </a>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-4xl text-teal-500 mr-4" />
              <a
                href="mailto:lalitkumar.meena.lk@gmail.com"
                className="text-xl text-gray-700 hover:text-blue-500 transition-colors duration-300"
              >
                lalitkumar.meena.lk@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            style={{ height: "400px" }}
          >
            <Map />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
