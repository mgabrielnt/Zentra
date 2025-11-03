export interface WaskitaProject {
  id: string | number; // Changed from integer to string
  title: string;
  category: string;
  description: string;
  image: string ;
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

export const waskitaProjectData: WaskitaProject = {
  id: '1', // Changed to string to match interface
  title: 'Waskita Project',
  category: 'Infrastructure Development',
  description: `A comprehensive infrastructure development project showcasing innovative construction solutions and sustainable engineering practices.
  
This project demonstrates our commitment to excellence in large-scale construction and infrastructure development.`,
  image: '/project/waskita/Waskita by STOPHIVA.png',
  backgroundImage: '/images/projects/waskita/background.jpg',
  
  overview: {
    title: 'Overview This Project',
    paragraphs: [
      'This comprehensive infrastructure project represents a significant milestone in modern construction and engineering excellence. The project encompasses cutting-edge design principles, sustainable building practices, and innovative construction methodologies that set new standards in the industry.',
      
      'Our team worked closely with stakeholders to deliver a solution that not only meets technical requirements but also exceeds expectations in terms of quality, safety, and environmental responsibility. The project demonstrates our capability to handle complex, large-scale developments while maintaining the highest standards of workmanship and project management.',
      
      'Through careful planning and execution, we successfully integrated advanced technologies and sustainable practices throughout the project lifecycle. This approach ensured optimal resource utilization, minimized environmental impact, and delivered long-term value to all stakeholders involved.'
    ]
  },
  
  gallery: [
    {
      id: 1,
      image: '/project/waskita/Waskita by STOPHIVA.png',
      alt: 'Project construction phase overview'
    },
    {
      id: 2,
      image: '/project/waskita/Waskita by STOPHIVA.png',
      alt: 'Infrastructure detail and engineering excellence'
    },
    {
      id: 3,
      image: '/project/waskita/Waskita by STOPHIVA.png',
      alt: 'Completed structure showcase'
    },
    {
      id: 4,
      image: '/project/waskita/Waskita by STOPHIVA.png',
      alt: 'Final project delivery and handover'
    }
  ],
  
  technologies: [
    'Advanced BIM Modeling',
    'Sustainable Construction Methods',
    'Smart Infrastructure Systems',
    'Quality Management Systems'
  ],
  
  duration: '24 Months',
  client: 'PT Waskita Karya'
};

// Array of all projects - tambahkan projects lain di sini jika ada
const projects: WaskitaProject[] = [
  waskitaProjectData,
  // Tambahkan project lain di sini
];

// Export function to get project by ID
export function getProjectContentById(id: string): WaskitaProject | undefined {
  return projects.find(project => project.id === id);
}

// Export function to get all projects
export function getAllProjects(): WaskitaProject[] {
  return projects;
}

// Export function to get specific project data
export function getWaskitaProjectData(): WaskitaProject {
  return waskitaProjectData;
}