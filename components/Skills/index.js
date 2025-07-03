import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faDesktop,
  faFileAlt,
  faSearch,
  faTasks,
  faUsersCog,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  faComments,
  faDesktop,
  faFileAlt,
  faSearch,
  faTasks,
  faUsersCog,
};

const Skill = ({ icon, title, description }) => (
  <div className="w-full md:w-1/3 p-4">
    <div className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
      <div className="text-5xl text-green-500 mb-4">
        <FontAwesomeIcon icon={iconMap[icon]} />
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get('/skills.json').then(data => {
      setSkills(data.data.skills);
    });
  }, []);

  return (
    <div className="py-20 bg-gray-50" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-gray-800">Skills</h2>
        <hr className="w-1/4 mx-auto mb-12 border-t-2 border-teal-500" />
        <div className="flex flex-wrap -m-4">
          {skills &&
            skills.map((skill, i) => (
              <Skill
                key={i}
                title={skill.title}
                description={skill.description}
                icon={skill.icon}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
