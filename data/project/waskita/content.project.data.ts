export interface ContentProject {
  id: string | number; // Changed from integer to string
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

// --- PROYEK PERTAMA ---
export const ContentProjectData: ContentProject = {
  id: '1', // Changed to string to match interface
  title: 'Waskita Project',
  category: 'Infrastructure Development',
  description: 'A comprehensive infrastructure development project showcasing innovative construction solutions and sustainable engineering practices. This project demonstrates our commitment to excellence in large-scale construction and infrastructure development.',
  backgroundImage: '/project/waskita/PosterStophivaTanpaTulisana.png',
  image: '/project/waskita/PosterStophivaTanpaTulisana.png',
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
      image: '/project/waskita/sswaskita/Login.jpg',
      alt: 'Project construction phase overview'
    },
    {
      id: 2,
      image: '/project/waskita/sswaskita/Asissten.jpg',
      alt: 'Infrastructure detail and engineering excellence'
    },
    {
      id: 3,
      image: '/project/waskita/sswaskita/KelolaQuiz.jpg',
      alt: 'Completed structure showcase'
    },
    {
      id: 4,
      image: '/project/waskita/sswaskita/EvaluasiQuiz.jpg',
      alt: 'Final project delivery and handover'
    },
    {
      id: 5,
      image: '/project/waskita/sswaskita/QuizUser.jpg',
      alt: 'Final project delivery and handover'
    },
    {
      id: 6,
      image: '/project/waskita/sswaskita/TambahMateri.jpg',
      alt: 'Final project delivery and handover'
    }
  ], // <-- PERBAIKAN: Array 'gallery' ditutup di sini

  // <-- PERBAIKAN: Properti ini milik 'ContentProjectData'
  technologies: [
    'Advanced BIM Modeling',
    'Sustainable Construction Methods',
    'Smart Infrastructure Systems',
    'Quality Management Systems'
  ],
  duration: '24 Months',
  client: 'PT Waskita Karya'
};

export const ContentProjectData2: ContentProject = {
  id: '2', // Changed to string to match interface
  title: 'PKPRI', // Saya ubah title-nya agar beda
  category: 'Infrastructure Development',
  description: 'A comprehensive infrastructure development project showcasing innovative construction solutions and sustainable engineering practices. This project demonstrates our commitment to excellence in large-scale construction and infrastructure development.',
  backgroundImage: '/project/pkpri/PosterPKPRITanpaTulisan.png',
  image: '/project/pkpri/PosterPKPRITanpaTulisan.png',
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
      image: '/project/pkpri/sspkpri/Beranda1.jpg',
      alt: 'Project construction phase overview'
    },
    {
      id: 2,
      image: '/project/pkpri/sspkpri/Beranda3.jpg',
      alt: 'Infrastructure detail and engineering excellence'
    },
    {
      id: 3,
      image: '/project/pkpri/sspkpri/Beranda2.jpg',
      alt: 'Project construction phase overview'
    },
    {
      id: 4,
      image: '/project/pkpri/sspkpri/Pengurus.jpg',
      alt: 'Project construction phase overview'
    },
    {
      id: 5,
      image: '/project/pkpri/sspkpri/Foto.jpg',
      alt: 'Infrastructure detail and engineering excellence'
    },
    {
      id: 6,
      image: '/project/pkpri/sspkpri/Kontak.jpg',
      alt: 'Infrastructure detail and engineering excellence'
    }
  ],
  duration: '24 Months',
  client: 'PT Waskita Karya'
};

// --- PROYEK KEDUA (YANG TADI SALAH TEMPAT) ---
export const ContentProjectData3: ContentProject = {
  id: '3', // Changed to string to match interface
  title: 'BKI', // Saya ubah title-nya agar beda
  category: 'Infrastructure Development',
  description: 'A comprehensive infrastructure development project showcasing innovative construction solutions and sustainable engineering practices. This project demonstrates our commitment to excellence in large-scale construction and infrastructure development.',
  backgroundImage: '/project/bki/PosterBKITanpaTulisan.png',
  image: '/project/bki/PosterBKITanpaTulisan.png',
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
      image: '/project/bki/ssbki/Addmember.jpg',
      alt: 'Project construction phase overview'
    },
    {
      id: 2,
      image: '/project/bki/ssbki/Register.jpg',
      alt: 'Infrastructure detail and engineering excellence'
    },
    {
      id: 3,
      image: '/project/bki/ssbki/calender.jpg',
      alt: 'Project construction phase overview'
    },
    {
      id: 4,
      image: '/project/bki/ssbki/SetTeam.jpg',
      alt: 'Project construction phase overview'
    },
    {
      id: 5,
      image: '/project/bki/ssbki/Lapkeu.jpg',
      alt: 'Infrastructure detail and engineering excellence'
    },
    {
      id: 6,
      image: '/project/bki/ssbki/Dashbord.jpg',
      alt: 'Project construction phase overview'
    }
  ],
  duration: '24 Months',
  client: 'PT Waskita Karya'
};


// --- PERBAIKAN: Masukkan KEDUA proyek ke dalam array ---
const projects: ContentProject[] = [
  ContentProjectData,
  ContentProjectData2,
  ContentProjectData3, // <-- Tambahkan proyek kedua di sini
  // Tambahkan project lain di sini
];

// Export function to get project by ID
export function getProjectContentById(id: string): ContentProject | undefined {
  // Ubah 'project.id === id' menjadi 'project.id.toString() === id' 
  // agar aman jika ID-nya adalah angka
  return projects.find(project => project.id.toString() === id);
}

// Export function to get all projects
export function getAllProjects(): ContentProject[] {
  return projects;
}

// Export function to get specific project data (mungkin ini tidak perlu lagi)
// Saya tetap biarkan, tapi mungkin Anda ingin menghapusnya
export function getContentProjectData(): ContentProject {
  return ContentProjectData;
}