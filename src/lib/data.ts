import type { User, Job, LearningModule, Team } from '@/lib/types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Savitri Bai',
  email: 'savitri.bai@example.com',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  skills: ['React', 'Node.js', 'TypeScript', 'Project Management', 'Public Speaking'],
  experience: '5+ years as a full-stack developer and team lead in the tech industry. Passionate about building scalable applications and mentoring junior developers.',
  desiredJobType: 'Full-time',
  locationPreferences: 'Remote',
  industryPreferences: ['Technology', 'Education'],
  profileCompletion: 75,
};

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    companyName: 'Innovate Inc.',
    companyLogoUrl: 'https://picsum.photos/seed/logo1/100/100',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'Join our team to build the next generation of web applications. You will be responsible for leading the development of our user-facing features.',
    skillsRequired: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    industry: 'Technology',
  },
  {
    id: 'job-2',
    title: 'Product Manager',
    companyName: 'Solutions Co.',
    companyLogoUrl: 'https://picsum.photos/seed/logo2/100/100',
    location: 'New York, NY',
    jobType: 'Full-time',
    description: 'We are looking for a Product Manager to own the product roadmap and drive the development of new features from concept to launch.',
    skillsRequired: ['Product Management', 'Agile', 'User Research'],
    industry: 'Software',
  },
  {
    id: 'job-3',
    title: 'UX/UI Designer',
    companyName: 'Creative Designs',
    companyLogoUrl: 'https://picsum.photos/seed/logo3/100/100',
    location: 'Remote',
    jobType: 'Contract',
    description: 'Seeking a talented UX/UI designer to create intuitive and beautiful interfaces for our mobile and web applications. Contract position with possibility of extension.',
    skillsRequired: ['Figma', 'Adobe XD', 'User Centered Design'],
    industry: 'Design',
  },
  {
    id: 'job-4',
    title: 'Data Science Intern',
    companyName: 'Data Insights',
    companyLogoUrl: 'https://picsum.photos/seed/logo4/100/100',
    location: 'San Francisco, CA',
    jobType: 'Internship',
    description: 'Exciting internship opportunity for a student passionate about data science. Work on real-world projects and learn from experienced mentors.',
    skillsRequired: ['Python', 'R', 'SQL', 'Machine Learning'],
    industry: 'Data Science',
  },
];


export const mockLearningModules: LearningModule[] = [
  {
    id: 'learn-1',
    title: 'Financial Literacy for Entrepreneurs',
    description: 'Master the financial essentials for starting and growing your business.',
    type: 'video',
    duration: '2h 30m',
    imageUrl: 'https://picsum.photos/seed/learn1/600/400',
    progress: 50,
  },
  {
    id: 'learn-2',
    title: 'Advanced Digital Marketing',
    description: 'Learn SEO, SEM, and social media strategies to boost your online presence.',
    type: 'article',
    duration: '45 min read',
    imageUrl: 'https://picsum.photos/seed/learn2/600/400',
    progress: 0,
  },
  {
    id: 'learn-3',
    title: 'Leadership and Team Management',
    description: 'Develop your leadership skills and learn how to manage a high-performing team.',
    type: 'video',
    duration: '3h 15m',
    imageUrl: 'https://picsum.photos/seed/learn3/600/400',
    progress: 100,
  },
  {
    id: 'learn-4',
    title: 'Introduction to Coding with Python',
    description: 'A beginner-friendly introduction to the world of programming with Python.',
    type: 'video',
    duration: '5h',
    imageUrl: 'https://picsum.photos/seed/learn4/600/400',
    progress: 25,
  },
];

export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Artisans United',
    description: 'A collective of women artisans creating and selling handmade crafts.',
    members: [
      { id: 'user-1', name: 'Savitri Bai', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
      { id: 'user-2', name: 'Priya Kaur', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
      { id: 'user-3', name: 'Aisha Begum', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
    ],
  },
  {
    id: 'team-2',
    name: 'Tech Forward',
    description: 'A group for women in tech to collaborate on projects and support each other.',
    members: [
      { id: 'user-1', name: 'Savitri Bai', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
    ],
  },
];
