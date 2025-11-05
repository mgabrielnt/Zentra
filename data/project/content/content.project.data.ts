export interface ContentProject {
  id: string | number;
  title: string;
  category: string;
  description: string;
  image: string;
  backgroundImage: string;
  overview: {
    title: string;
    paragraphs: string[];
  };
  gallery: {
    id: number | string;
    image: string;
    alt: string;
  }[];
  technologies?: string[];
  duration?: string;
  client?: string;
}

// --- PROYEK PERTAMA (Waskita) ---
// --- PROYEK PERTAMA (Waskita) ---
export const ContentProjectData: ContentProject = {
  id: '1',
  title: 'Waskita Project',
  category: 'EDUCATION',
  description:
    'An interactive and educational web platform that focuses on HIV/AIDS awareness and prevention. Waskita provides users with engaging learning materials such as quizzes, informative articles, and educational videos to increase public understanding about health, stigma, and support networks. The project aims to create a digital learning environment that promotes empathy, inclusivity, and accurate health information through interactive design and accessible user experience.',
  backgroundImage: '/project/waskita/PosterStophivaTanpaTulisana.png',
  image: '/project/waskita/PosterStophivaTanpaTulisana.png',
  overview: {
    title: 'Project Overview',
    paragraphs: [
      'Waskita is a digital education platform created to raise awareness and understanding of HIV & AIDS in Indonesia. The project addresses the lack of accessible and accurate information by providing interactive learning experiences for the general public.',
      'The system features multiple modules including quizzes for self-evaluation, article libraries with reliable sources, and video learning sessions designed to make health education engaging and inclusive.',
      'In addition to being user-oriented, Waskita also includes an administrative dashboard where content managers can easily update quizzes, manage learning materials, and oversee user engagement analytics. This makes Waskita both a public educational tool and a professional management system for long-term sustainability.',
    ],
  },
  gallery: [
    { id: 1, image: '/project/waskita/sswaskita/Login.jpg', alt: 'Login Page' },
    { id: 2, image: '/project/waskita/sswaskita/Asissten.jpg', alt: 'AI Assistant Feature' },
    { id: 3, image: '/project/waskita/sswaskita/KelolaQuiz.jpg', alt: 'Quiz Management Dashboard' },
    { id: 4, image: '/project/waskita/sswaskita/EvaluasiQuiz.jpg', alt: 'Quiz Evaluation' },
    { id: 5, image: '/project/waskita/sswaskita/QuizUser.jpg', alt: 'User Quiz Interface' },
    { id: 6, image: '/project/waskita/sswaskita/TambahMateri.jpg', alt: 'Add Material Page' },
  ],
  technologies: [
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Prisma',
    'PostgreSQL',
    'NextAuth.js',
  ],
};

// --- PROYEK KEDUA (PKPRI) ---
export const ContentProjectData2: ContentProject = {
  id: '2',
  title: 'PKPRI',
  category: 'COMPANY PROFILE',
  description:
    'A professional and informative company profile website built for PKPRI (Pusat Koperasi Pegawai Republik Indonesia). This platform highlights the organization’s vision, structure, and services while presenting its long-standing contribution to Indonesian cooperative development. Designed with modern UI/UX principles, the website serves as an official digital identity and communication channel for members and partners across regions.',
  backgroundImage: '/project/pkpri/PosterPKPRITanpaTulisan.png',
  image: '/project/pkpri/PosterPKPRITanpaTulisan.png',
  overview: {
    title: 'Project Overview',
    paragraphs: [
      'The PKPRI website is a digital transformation initiative aimed at modernizing how cooperatives present and communicate their activities. It centralizes essential information about organizational structure, services, events, and cooperative programs into one cohesive platform.',
      'The website provides visitors with a clear navigation experience, offering sections for history, achievements, board members, and cooperative events, allowing users to understand PKPRI’s contributions to Indonesia’s economic and social sectors.',
      'Additionally, the platform supports transparency and credibility by including regularly updated content such as announcements, photo galleries, and contact information, ensuring effective engagement between the organization and the community.',
    ],
  },
  gallery: [
    { id: 1, image: '/project/pkpri/sspkpri/Beranda1.jpg', alt: 'Homepage Section 1' },
    { id: 2, image: '/project/pkpri/sspkpri/Beranda3.jpg', alt: 'Homepage Section 3' },
    { id: 3, image: '/project/pkpri/sspkpri/Beranda2.jpg', alt: 'Homepage Section 2' },
    { id: 4, image: '/project/pkpri/sspkpri/Pengurus.jpg', alt: 'Management/Board Page' },
    { id: 5, image: '/project/pkpri/sspkpri/Foto.jpg', alt: 'Photo Gallery' },
    { id: 6, image: '/project/pkpri/sspkpri/Kontak.jpg', alt: 'Contact Page' },
  ],
  technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'Vercel'],
};

// --- PROYEK KETIGA (BKI) ---
export const ContentProjectData3: ContentProject = {
  id: '3',
  title: 'BKI Dashboard',
  category: 'DASHBOARD',
  description:
    'An advanced administrative dashboard developed for Biro Klasifikasi Indonesia (BKI) to centralize data management, monitor organizational performance, and enhance decision-making processes. The platform provides real-time insights into financial reports, staff activities, and operational efficiency through an integrated visual dashboard and management tools.',
  backgroundImage: '/project/bki/PosterBKITanpaTulisan.png',
  image: '/project/bki/PosterBKITanpaTulisan.png',
  overview: {
    title: 'Project Overview',
    paragraphs: [
      'The BKI Dashboard was designed as an internal management system to streamline administrative processes and facilitate data-driven decision-making. It consolidates financial data, employee metrics, and operational reports into one interactive dashboard.',
      'The system enables users to generate detailed financial statements, monitor project milestones, manage staff assignments, and track organizational goals with precision. Visualization tools such as charts and summaries provide executives with actionable insights in real time.',
      'Built with scalability and usability in mind, the BKI Dashboard includes features like calendar scheduling, role-based user access, and data visualization modules, empowering the organization to work efficiently and transparently across departments.',
    ],
  },
  gallery: [
    { id: 1, image: '/project/bki/ssbki/Addmember.jpg', alt: 'Add Member Modal' },
    { id: 2, image: '/project/bki/ssbki/Register.jpg', alt: 'Register Page' },
    { id: 3, image: '/project/bki/ssbki/calender.jpg', alt: 'Calendar View' },
    { id: 4, image: '/project/bki/ssbki/SetTeam.jpg', alt: 'Set Team Page' },
    { id: 5, image: '/project/bki/ssbki/Lapkeu.jpg', alt: 'Financial Report' },
    { id: 6, image: '/project/bki/ssbki/Dashbord.jpg', alt: 'Main Dashboard' },
  ],
  technologies: [
    'Next.js',
    'React.js',
    'Recharts',
    'Prisma',
    'MySQL',
    'Tailwind CSS',
  ],
  client: 'Biro Klasifikasi Indonesia',
};

// --- PROYEK KEEMPAT (Mlokomanis) ---
export const ContentProjectData4: ContentProject = {
  id: '4',
  title: 'Mlokomanis Village Landing Page',
  category: 'LANDING PAGES',
  description:
    'A visually captivating landing page designed for Mlokomanis Village to promote its tourism, culture, and local economic potential. The platform acts as a digital introduction to the village, showcasing its natural beauty, traditional values, and community initiatives. Through modern design and responsive layout, the website aims to support local empowerment and sustainable tourism growth.',
  backgroundImage: '/project/mlokomanis/PosterMlokomanisTanpaTulisan.png',
  image: '/project/mlokomanis/PosterMlokomanisTanpaTulisan.png',
  overview: {
    title: 'Project Overview',
    paragraphs: [
      'The Mlokomanis Village Landing Page is a community-based digital initiative to introduce the charm, traditions, and development potential of the village to a wider audience. It serves as an official online presence for both local residents and visitors.',
      'The website highlights various aspects of the village, including its scenic landscapes, local crafts, culinary specialties, and cultural heritage. Its storytelling design helps visitors connect emotionally with the village and encourages tourism participation.',
      'Built with accessibility and aesthetics in mind, the website features smooth animations, modern typography, and mobile-friendly responsiveness to ensure an immersive browsing experience while maintaining focus on local empowerment and sustainability.',
    ],
  },
  gallery: [
    { id: 1, image: '/project/mlokomanis/ssmlokomanis/Bagian1.jpg', alt: 'Landing Page Section 1' },
    { id: 2, image: '/project/mlokomanis/ssmlokomanis/Bagian2.jpg', alt: 'Landing Page Section 2' },
    { id: 3, image: '/project/mlokomanis/ssmlokomanis/Bagian3.jpg', alt: 'Landing Page Section 3' },
    { id: 4, image: '/project/mlokomanis/ssmlokomanis/Bagian4.jpg', alt: 'Landing Page Section 4' },
    { id: 5, image: '/project/mlokomanis/ssmlokomanis/Bagian5.jpg', alt: 'Landing Page Section 5' },
    { id: 6, image: '/project/mlokomanis/ssmlokomanis/Bagian6.jpg', alt: 'Landing Page Section 6' },
  ],
  technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
};


// --- Array semua proyek ---
const projects: ContentProject[] = [
  ContentProjectData,
  ContentProjectData2,
  ContentProjectData3,
  ContentProjectData4,
];

// Export function to get project by ID
export function getProjectContentById(id: string): ContentProject | undefined {
  return projects.find(project => project.id.toString() === id);
}

// Export function to get all projects
export function getAllProjects(): ContentProject[] {
  return projects;
}

// Export function to get specific project data (mungkin ini tidak perlu lagi)
export function getContentProjectData(): ContentProject {
  return ContentProjectData;
}