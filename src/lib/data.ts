import type { User, Job, LearningModule, Team } from '@/lib/types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Savitri Bai',
  email: 'savitri.bai@example.com',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  skills: ['House Decoration', 'Plate Decoration for Function', 'Event Planning', 'Catering', 'Cooking'],
  experience: 'Over 5 years of experience in managing household functions, organizing community events, and providing high-quality catering services. Specializes in traditional and contemporary decor.',
  desiredJobType: 'Full-time',
  locationPreferences: 'Remote',
  industryPreferences: ['Hospitality', 'Events', 'Home Services'],
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
    salary: '₹8,00,000 - ₹12,00,000 PA',
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
    salary: '₹4,00,000 - ₹6,00,000 PA',
    description: 'Join our artisan collective to craft beautiful pottery. Expertise in wheel-throwing and glazing techniques is required.',
    skillsRequired: ['Pottery', 'Wheel-throwing', 'Glazing', 'Ceramics'],
    industry: 'Art & Craft',
  },
  {
    id: 'job-3',
    title: 'House Cleaning Staff',
    companyName: 'Clean Homes Co.',
    companyLogoUrl: 'https://picsum.photos/seed/logo5/100/100',
    location: 'Pune, MH',
    jobType: 'Part-time',
    salary: '₹250 - ₹400 / hour',
    description: 'Reliable and detail-oriented staff needed for residential cleaning services. Flexible hours.',
    skillsRequired: ['Cleaning', 'Time Management', 'Hygiene Standards'],
    industry: 'Domestic Services',
  },
  {
    id: 'job-4',
    title: 'Babysitter / Nanny',
    companyName: 'Little Angels Care',
    companyLogoUrl: 'https://picsum.photos/seed/logo6/100/100',
    location: 'Delhi, NCR',
    jobType: 'Contract',
    salary: '₹300 - ₹500 / hour',
    description: 'Caring and responsible babysitter required for a family with two young children. Experience with toddlers is a must.',
    skillsRequired: ['Child Care', 'First Aid', 'Patience', 'Communication'],
    industry: 'Child Care',
  },
   {
    id: 'job-5',
    title: 'Home Nurse',
    companyName: 'Health at Home',
    companyLogoUrl: 'https://picsum.photos/seed/logo7/100/100',
    location: 'Bangalore, KA',
    jobType: 'Full-time',
    salary: '₹25,000 - ₹40,000 / month',
    description: 'Certified home nurse to provide compassionate care for elderly patients. Duties include monitoring vitals, administering medication, and personal care.',
    skillsRequired: ['Nursing', 'Patient Care', 'Medication Administration', 'Empathy'],
    industry: 'Healthcare',
  },
];


export const mockLearningModules: LearningModule[] = [
  {
    id: 'learn-1',
    title: 'Professional Cooking Techniques',
    description: 'Master the fundamental techniques of professional cooking, from knife skills to sauce making.',
    type: 'video',
    duration: '4h 15m',
    imageUrl: 'https://picsum.photos/seed/cook/600/400',
    progress: 40,
  },
  {
    id: 'learn-2',
    title: 'Advanced Digital Marketing',
    description: 'Learn SEO, SEM, and social media strategies to boost your online presence.',
    type: 'article',
    duration: '45 min read',
    imageUrl: 'https://picsum.photos/seed/marketing/600/400',
    progress: 0,
  },
  {
    id: 'learn-3',
    title: 'The Art of Plate Decoration',
    description: 'Learn how to present your culinary creations with artistic flair and elegance.',
    type: 'video',
    duration: '1h 45m',
    imageUrl: 'https://picsum.photos/seed/plate/600/400',
    progress: 75,
  },
  {
    id: 'learn-4',
    title: 'Introduction to Coding with Python',
    description: 'A beginner-friendly introduction to the world of programming with Python.',
    type: 'video',
    duration: '5h',
    imageUrl: 'https://picsum.photos/seed/coding/600/400',
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
