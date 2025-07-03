const ResumePage = () => (
  <div className="bg-gray-100 min-h-screen py-12" style={{
    backgroundImage: 'linear-gradient(#28c4a5, rgba(121, 209, 113, 0.5)), url(/images/resume-image.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
    margin: 'auto',
    borderRadius: '10px',
    padding: '0'
  }}>
    <Head>
      <title>Lalit Kumar | Resume</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="container mx-auto px-4 bg-white shadow-lg rounded-lg p-8">
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block text-lg font-medium transition-colors duration-300">
          &larr; Back to Portfolio
      </Link>

      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-gray-800">Lalit Kumar</h1>
        <p className="text-2xl text-gray-600 mt-2">Software Developer</p>
      </header>

      <section className="mb-12 p-6 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex flex-wrap justify-center space-x-6 text-gray-700">
          <a href="tel:+919712618438" className="flex items-center hover:text-blue-600 transition-colors duration-300">
            <FaPhone className="inline-block mr-2 text-xl" />
            <span className="text-lg">(+91) 9712618438</span>
          </a>
          <a href="mailto:lalitkumar.meena.lk@gmail.com" className="flex items-center hover:text-blue-600 transition-colors duration-300">
            <FaEnvelope className="inline-block mr-2 text-xl" />
            <span className="text-lg">lalitkumar.meena.lk@gmail.com</span>
          </a>
          <a href="https://lalitmee.github.io" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 transition-colors duration-300">
            <FaGlobe className="inline-block mr-2 text-xl" />
            <span className="text-lg">lalitmee.github.io</span>
          </a>
          <a href="https://github.com/lalitmee" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 transition-colors duration-300">
            <FaGithub className="inline-block mr-2 text-xl" />
            <span className="text-lg">lalitmee</span>
          </a>
          <a href="https://www.linkedin.com/in/lalitmee/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 transition-colors duration-300">
            <FaLinkedin className="inline-block mr-2 text-xl" />
            <span className="text-lg">lalitmee</span>
          </a>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl font-bold border-b-4 border-teal-500 pb-3 mb-6 text-gray-800">Education</h2>
        <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700">Indian Institute of Information Technology, Vadodara</h3>
          <p className="text-gray-600 text-lg">B.Tech in Information Technology | 2014 - 2018</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl font-bold border-b-4 border-teal-500 pb-3 mb-6 text-gray-800">Skills</h2>
        <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
          <p className="text-lg mb-2"><strong>Programming:</strong> Python, C/C++, Java, Shell, LaTeX</p>
          <p className="text-lg mb-2"><strong>Web Programming:</strong> HTML5, CSS3, JavaScript, jQuery</p>
          <p className="text-lg"><strong>Frameworks:</strong> React.js, Angular</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl font-bold border-b-4 border-teal-500 pb-3 mb-6 text-gray-800">Experience</h2>
        <div className="mt-4 space-y-8 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Software Engineer | koinearth</h3>
            <p className="text-gray-600 text-lg">Aug 2019 - Present</p>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
              <li>Working on Blockchain Product Marketsn.com</li>
              <li>Learning new and advanced practices in React Environment</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Software Engineer | CognitiveClouds</h3>
            <p className="text-gray-600 text-lg">Jun 2018 - Aug 2019</p>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
              <li>Worked on real time projects using technologies like Angular and React.js</li>
              <li>Learned how to collaborate efficiently in a team of motivated and dedicated developers/engineers.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl font-bold border-b-4 border-teal-500 pb-3 mb-6 text-gray-800">Projects</h2>
        <div className="mt-4 space-y-8 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Projectile - Student Project Listing Platform</h3>
            <p className="text-gray-600 text-lg">Django, JavaScript, HTML and CSS</p>
            <a href="http://projectile.pythonanywhere.com/login/?next=/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mt-2 inline-block">
              View Project
            </a>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Notes-Webapp</h3>
            <p className="text-gray-600 text-lg">React.js, HTML5 and CSS3</p>
            <a href="https://lalitmee.github.io/Notes-App/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mt-2 inline-block">
              View Project
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default ResumePage;
