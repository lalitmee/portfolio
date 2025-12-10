import { IconType } from 'react-icons';
import { FaCode, FaGitAlt, FaJava, FaServer } from 'react-icons/fa';
import {
  SiAmazon,
  SiAngular,
  SiBootstrap,
  SiCss3,
  SiDocker,
  SiGnubash,
  SiGoogleanalytics,
  SiGooglebigquery,
  SiGooglemaps,
  SiGoogletagmanager,
  SiGraphql,
  SiHtml5,
  SiJasmine,
  SiJavascript,
  SiJenkins,
  SiJquery,
  SiKubernetes,
  SiLua,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNeovim,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedhat,
  SiRedis,
  SiRedux,
  SiSpringboot,
  SiStorybook,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVim,
} from 'react-icons/si';
import { twMerge } from 'tailwind-merge';

export const getTechIcon = (tech: string, className?: string) => {
  const normalizedTech = tech.toLowerCase().trim();
  let Icon: IconType = FaCode;
  let defaultClass = 'text-gray-400';

  switch (normalizedTech) {
    case 'react':
    case 'react native':
    case 'react.js':
      Icon = SiReact;
      defaultClass = 'text-blue-400';
      break;
    case 'typescript':
      Icon = SiTypescript;
      defaultClass = 'text-blue-600';
      break;
    case 'javascript':
    case 'js':
      Icon = SiJavascript;
      defaultClass = 'text-yellow-400';
      break;
    case 'node.js':
    case 'nodejs':
      Icon = SiNodedotjs;
      defaultClass = 'text-green-500';
      break;
    case 'next.js':
    case 'nextjs':
      Icon = SiNextdotjs;
      defaultClass = 'text-black dark:text-white';
      break;
    case 'postgresql':
      Icon = SiPostgresql;
      defaultClass = 'text-blue-300';
      break;
    case 'mongodb':
      Icon = SiMongodb;
      defaultClass = 'text-green-400';
      break;
    case 'redis':
      Icon = SiRedis;
      defaultClass = 'text-red-500';
      break;
    case 'docker':
      Icon = SiDocker;
      defaultClass = 'text-blue-500';
      break;
    case 'kubernetes':
    case 'k8s':
      Icon = SiKubernetes;
      defaultClass = 'text-blue-400';
      break;
    case 'aws':
      Icon = SiAmazon;
      defaultClass = 'text-orange-400';
      break;
    case 'graphql':
      Icon = SiGraphql;
      defaultClass = 'text-pink-500';
      break;
    case 'python':
      Icon = SiPython;
      defaultClass = 'text-blue-300';
      break;
    case 'java':
      Icon = FaJava;
      defaultClass = 'text-red-500';
      break;
    case 'stripe':
      Icon = SiStripe;
      defaultClass = 'text-primary-400';
      break;
    case 'storybook':
      Icon = SiStorybook;
      defaultClass = 'text-pink-500';
      break;
    case 'tailwindcss':
    case 'tailwind css':
      Icon = SiTailwindcss;
      defaultClass = 'text-cyan-400';
      break;
    case 'lua':
      Icon = SiLua;
      defaultClass = 'text-blue-500';
      break;
    case 'neovim':
      Icon = SiNeovim;
      defaultClass = 'text-green-500';
      break;
    case 'vim script':
    case 'vim':
      Icon = SiVim;
      defaultClass = 'text-green-500';
      break;
    case 'semantic-ui':
    case 'css3':
    case 'css':
      Icon = SiCss3;
      defaultClass = 'text-blue-500';
      break;
    case 'redux':
      Icon = SiRedux;
      defaultClass = 'text-primary-500';
      break;
    case 'shell':
    case 'bash':
      Icon = SiGnubash;
      defaultClass = 'text-gray-500 dark:text-gray-300';
      break;
    case 'html5 canvas':
    case 'html5':
    case 'html':
      Icon = SiHtml5;
      defaultClass = 'text-orange-500';
      break;
    case 'bootstrap':
      Icon = SiBootstrap;
      defaultClass = 'text-primary-600';
      break;
    case 'jquery':
      Icon = SiJquery;
      defaultClass = 'text-blue-500';
      break;
    case 'jasmine':
      Icon = SiJasmine;
      defaultClass = 'text-primary-800';
      break;
    case 'google maps api':
      Icon = SiGooglemaps;
      defaultClass = 'text-green-500';
      break;
    case 'material-ui':
    case 'mui':
      Icon = SiMui;
      defaultClass = 'text-blue-500';
      break;
    case 'patternfly':
      Icon = SiRedhat;
      defaultClass = 'text-red-500';
      break;
    case 'angular':
      Icon = SiAngular;
      defaultClass = 'text-red-600';
      break;
    case 'gtm':
    case 'google tag manager':
      Icon = SiGoogletagmanager;
      defaultClass = 'text-blue-500';
      break;
    case 'ga4':
    case 'google analytics':
      Icon = SiGoogleanalytics;
      defaultClass = 'text-orange-500';
      break;
    case 'bigquery':
      Icon = SiGooglebigquery;
      defaultClass = 'text-blue-500';
      break;
    case 'mysql':
      Icon = SiMysql;
      defaultClass = 'text-blue-500';
      break;
    case 'rest apis':
    case 'rest api':
      Icon = FaServer;
      defaultClass = 'text-blue-400';
      break;
    case 'git':
      Icon = FaGitAlt;
      defaultClass = 'text-orange-500';
      break;
    case 'spring boot':
      Icon = SiSpringboot;
      defaultClass = 'text-green-500';
      break;
    case 'vercel':
      Icon = SiVercel;
      defaultClass = 'text-black dark:text-white';
      break;
    case 'jenkins':
      Icon = SiJenkins;
      defaultClass = 'text-gray-600';
      break;
    default:
      Icon = FaCode;
      defaultClass = 'text-gray-400';
  }

  return <Icon className={twMerge(defaultClass, className)} />;
};
