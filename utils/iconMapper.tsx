import React from 'react';
import {
  FaAws,
  FaBrain,
  FaCertificate,
  FaCloud,
  FaCode,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaLightbulb,
  FaMobile,
  FaNodeJs,
  FaPython,
  FaReact,
  FaRocket,
  FaServer,
  FaTools,
  FaUsers,
} from 'react-icons/fa';
import {
  SiFirebase,
  SiGraphql,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';

export const iconMap: { [key: string]: React.ReactNode } = {
  // Frontend
  FaReact: <FaReact />,
  SiTypescript: <SiTypescript />,
  SiNextdotjs: <SiNextdotjs />,
  SiJavascript: <SiJavascript />,
  SiTailwindcss: <SiTailwindcss />,
  FaMobile: <FaMobile />,

  // Backend
  FaNodeJs: <FaNodeJs />,
  FaPython: <FaPython />,
  SiGraphql: <SiGraphql />,
  FaServer: <FaServer />,
  FaTools: <FaTools />,

  // Database
  SiMongodb: <SiMongodb />,
  SiPostgresql: <SiPostgresql />,
  SiRedis: <SiRedis />,
  SiFirebase: <SiFirebase />,
  FaDatabase: <FaDatabase />,

  // DevOps & Cloud
  FaAws: <FaAws />,
  FaDocker: <FaDocker />,
  SiKubernetes: <SiKubernetes />,
  SiJenkins: <SiJenkins />,
  SiVercel: <SiVercel />,
  FaGitAlt: <FaGitAlt />,
  FaCloud: <FaCloud />,

  // General
  FaCode: <FaCode />,
  FaBrain: <FaBrain />,
  FaRocket: <FaRocket />,
  FaLightbulb: <FaLightbulb />,
  FaUsers: <FaUsers />,
  FaCertificate: <FaCertificate />,
};

export const getIcon = (iconName: string): React.ReactNode => {
  return iconMap[iconName] || <FaCode />;
};
