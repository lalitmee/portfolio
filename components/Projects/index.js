import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngular,
  faCss3,
  faGithub,
  faHtml5,
  faJsSquare,
  faReact,
} from '@fortawesome/free-brands-svg-icons';



const iconMap = {
  react: faReact,
  javascript: faJsSquare,
  html: faHtml5,
  css: faCss3,
  angular: faAngular,
};

const Project = ({ project }) => (
  <div className="w-full md:w-1/3 p-4">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img
        src={project.project_image}
        alt={project.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
        <p className="text-gray-600 mb-4">{project.tagline}</p>
        <div className="flex items-center mb-4">
          {project.languages.map((tech, i) => (
            <FontAwesomeIcon
              key={i}
              icon={iconMap[tech]}
              className="text-3xl mr-2"
            />
          ))}
        </div>
        <a
          href={project.github_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          View on Github
        </a>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/projects.json').then(data => {
      setProjects(data.data.projects);
    });
  }, []);

  return (
    <div className="py-20 bg-gray-100" id="projects">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-gray-800">Projects</h2>
        <hr className="w-1/4 mx-auto mb-12 border-t-2 border-teal-500" />
        <div className="flex flex-wrap -m-4">
          {projects &&
            projects.map(project => <Project key={project.id} project={project} />)}
        </div>
      </div>
    </div>
  );
};

export default Projects;
