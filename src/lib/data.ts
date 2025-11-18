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
    title: 'Head Chef',
    companyName: 'Gourmet Meals',
    companyLogoUrl: 'https://picsum.photos/seed/logo1/100/100',
    location: 'Mumbai, MH',
    jobType: 'Full-time',
    salary: '₹8,00,000 - ₹12,00,000',
    description: 'Lead our kitchen team and create innovative menus. We are looking for a passionate chef with a flair for fusion cuisine.',
    skillsRequired: ['Culinary Arts', 'Menu Planning', 'Kitchen Management', 'Team Leadership'],
    industry: 'Hospitality',
  },
  {
    id: 'job-2',
    title: 'Master Potter',
    companyName: 'Earthly Vessels',
    companyLogoUrl: 'https://picsum.photos/seed/logo2/100/100',
    location: 'Jaipur, RJ',
    jobType: 'Full-time',
    description: 'Join our artisan collective to craft beautiful pottery. Expertise in wheel-throwing and glazing techniques is required.',
    skillsRequired: ['Pottery', 'Wheel-throwing', 'Glazing', 'Ceramics'],
    industry: 'Art & Craft',
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
    title: 'Professional Cooking Techniques',
    description: 'Master the fundamental techniques of professional cooking, from knife skills to sauce making.',
    type: 'video',
    duration: '4h 15m',
    imageUrl: 'https://picsum.photos/seed/cook1/600/400',
    progress: 40,
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
    title: 'The Art of Plate Decoration',
    description: 'Learn how to present your culinary creations with artistic flair and elegance.',
    type: 'video',
    duration: '1h 45m',
    imageUrl: 'https://picsum.photos/seed/plate1/600/400',
    progress: 75,
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
