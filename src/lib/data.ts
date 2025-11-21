
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
  rating: 4.5,
  membership: 'Rise',
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
  {
    id: 'job-6',
    title: 'Tailoring and Alterations Specialist',
    companyName: "Stree Shakti Styles",
    companyLogoUrl: 'https://picsum.photos/seed/logo8/100/100',
    location: 'Chennai, TN',
    jobType: 'Part-time',
    salary: '₹15,000 - ₹20,000 / month',
    description: 'Skilled tailor needed for custom clothing and alterations. Must be proficient with various fabrics and sewing machines.',
    skillsRequired: ['Tailoring', 'Sewing', 'Pattern Making', 'Alterations'],
    industry: 'Fashion',
  },
  {
    id: 'job-7',
    title: 'Event Decorator',
    companyName: "Mahila Mandan Events",
    companyLogoUrl: 'https://picsum.photos/seed/logo9/100/100',
    location: 'Kolkata, WB',
    jobType: 'Contract',
    salary: 'Project-based',
    description: 'Creative and organized event decorator for weddings and corporate events. Strong portfolio required.',
    skillsRequired: ['Event Decoration', 'Floral Arrangement', 'Client Communication', 'Budgeting'],
    industry: 'Events',
  },
  {
    id: 'job-8',
    title: 'Organic Farm Manager',
    companyName: "Nari Khet Organics",
    companyLogoUrl: 'https://picsum.photos/seed/logo10/100/100',
    location: 'Rural Punjab',
    jobType: 'Full-time',
    salary: '₹30,000 / month + accommodation',
    description: 'Manage a small organic farm, overseeing crop cultivation, harvesting, and local sales. Passion for sustainable agriculture is key.',
    skillsRequired: ['Farming', 'Organic Practices', 'Crop Management', 'Sales'],
    industry: 'Agriculture',
  },
];


export const mockLearningModules: LearningModule[] = [
  {
    id: 'learn-1-en',
    title: 'Professional Cooking Techniques',
    description: 'Master the fundamental techniques of professional cooking, from knife skills to sauce making.',
    type: 'video',
    duration: '10 min',
    imageUrl: 'https://picsum.photos/seed/cook/600/400',
    progress: 40,
    language: 'en',
    videoId: '1tVUj2g5A2s'
  },
  {
    id: 'learn-1-hi',
    title: 'Professional Cooking Techniques (Hindi)',
    description: 'Master the fundamental techniques of professional cooking, from knife skills to sauce making, in Hindi.',
    type: 'video',
    duration: '13 min',
    imageUrl: 'https://picsum.photos/seed/cook2/600/400',
    progress: 20,
    language: 'hi',
    videoId: 'Gup8L4s-gPA'
  },
  {
    id: 'learn-2-en',
    title: 'Advanced Digital Marketing',
    description: 'Learn SEO, SEM, and social media strategies to boost your online presence.',
    type: 'video',
    duration: '10 min',
    imageUrl: 'https://picsum.photos/seed/marketing/600/400',
    progress: 0,
    language: 'en',
    videoId: 'sO4-24r_ioU'
  },
    {
    id: 'learn-2-hi',
    title: 'Advanced Digital Marketing (Hindi)',
    description: 'Learn SEO, SEM, and social media strategies to boost your online presence, in Hindi.',
    type: 'video',
    duration: '15 min',
    imageUrl: 'https://picsum.photos/seed/marketing2/600/400',
    progress: 0,
    language: 'hi',
    videoId: '52hR-dJM3M0'
  },
  {
    id: 'learn-3-en',
    title: 'The Art of Plate Decoration',
    description: 'Learn how to present your culinary creations with artistic flair and elegance.',
    type: 'video',
    duration: '8 min',
    imageUrl: 'https://picsum.photos/seed/plate/600/400',
    progress: 75,
    language: 'en',
    videoId: 'i8aY2a7V2z0'
  },
   {
    id: 'learn-3-hi',
    title: 'The Art of Plate Decoration (Hindi)',
    description: 'Learn how to present your culinary creations with artistic flair and elegance, in Hindi.',
    type: 'video',
    duration: '4 min',
    imageUrl: 'https://picsum.photos/seed/plate2/600/400',
    progress: 10,
    language: 'hi',
    videoId: 'k-y_s4qises'
  },
  {
    id: 'learn-4-hi',
    title: 'Introduction to Coding with Python (Hindi)',
    description: 'A beginner-friendly introduction to the world of programming with Python, in Hindi.',
    type: 'video',
    duration: '1 hour',
    imageUrl: 'https://picsum.photos/seed/coding2/600/400',
    progress: 5,
    language: 'hi',
    videoId: 'v5-rF_63-v0'
  },
  {
    id: 'learn-5-ta',
    title: 'Introduction to Python (Tamil)',
    description: 'A beginner-friendly introduction to Python programming in Tamil.',
    type: 'video',
    duration: '30 min',
    imageUrl: 'https://picsum.photos/seed/coding3/600/400',
    progress: 0,
    language: 'ta',
    videoId: 'ASrD2-iC0gY'
  },
  {
    id: 'learn-6-en',
    title: 'Start a Home Salon & Spa',
    description: 'Learn how to start your own salon and spa business from home, covering services like facials, waxing, and threading.',
    type: 'video',
    duration: '8 min',
    imageUrl: 'https://picsum.photos/seed/salon/600/400',
    progress: 0,
    language: 'en',
    videoId: 'YV2p_23s1xE'
  }
];

export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Sakthi Women Catering',
    description: 'A collective of talented home chefs providing catering for local events and functions.',
    members: [
      { id: 'user-1', name: 'Savitri Bai', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
      { id: 'user-2', name: 'Priya Kaur', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
      { id: 'user-3', name: 'Aisha Begum', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
    ],
  },
  {
    id: 'team-2',
    name: 'Pengal Farm Working & Co',
    description: 'A team dedicated to organic farming, and selling fresh produce at local markets.',
    members: [
      { id: 'user-1', name: 'Savitri Bai', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
    ],
  },
  {
    id: 'team-3',
    name: 'Kalaiveena Artisans',
    description: 'A group for women artisans to collaborate on projects, share techniques, and sell handmade crafts.',
    members: [
      { id: 'user-4', name: 'Meena Kumari', avatarUrl: 'https://picsum.photos/seed/user4/100/100' },
      { id: 'user-5', name: 'Lakshmi Devi', avatarUrl: 'https://picsum.photos/seed/user5/100/100' },
    ],
  },
  {
    id: 'team-4',
    name: 'Chennai ChildMinders',
    description: 'A reliable network of experienced nannies and babysitters in the Chennai area.',
    members: [
      { id: 'user-6', name: 'Geeta', avatarUrl: 'https://picsum.photos/seed/user6/100/100' },
      { id: 'user-7', name: 'Sunita', avatarUrl: 'https://picsum.photos/seed/user7/100/100' },
    ],
  },
  {
    id: 'team-5',
    name: 'Bangalore Bakers Collective',
    description: 'Passionate bakers creating custom cakes and pastries for all occasions.',
    members: [
       { id: 'user-8', name: 'Anjali', avatarUrl: 'https://picsum.photos/seed/user8/100/100' },
       { id: 'user-9', name: 'Pooja', avatarUrl: 'https://picsum.photos/seed/user9/100/100' },
    ],
  },
    {
    id: 'team-6',
    name: 'Jaipur HandiCrafts',
    description: 'A team of artisans creating and selling traditional Jaipuri textiles and crafts.',
    members: [
        { id: 'user-10', name: 'Rani', avatarUrl: 'https://picsum.photos/seed/user10/100/100' },
    ],
  },
];
