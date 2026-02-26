const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
    title: 'Fullstack Portfolio MVP',
    tech: ['React', 'TypeScript', 'Node.js', 'Express'],
    description: 'This portfolio itself – a minimal fullstack app showcasing projects and contact.',
    githubUrl: 'https://github.com/your-username/portfolio',
    liveUrl: '#'
  },
  {
    id: 2,
    title: 'API Backend Example',
    tech: ['Node.js', 'Express', 'REST'],
    description: 'Sample REST API with authentication and CRUD operations.',
    githubUrl: 'https://github.com/your-username/api-backend',
    liveUrl: '#'
  },
  {
    id: 3,
    title: 'Frontend UI Showcase',
    tech: ['React', 'TailwindCSS'],
    description: 'A collection of reusable UI components and layouts.',
    githubUrl: 'https://github.com/your-username/ui-showcase',
    liveUrl: '#'
  }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }

  console.log('New contact message:', { name, email, message });

  res.json({ success: true, message: 'Message received. In a real app this would send an email.' });
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});

