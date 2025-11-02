export interface ProjectCard {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
  // Customization options
  logoText?: string;
  logoGradient?: string;
  madeByText?: string;
  categoryBadgeColor?: string;
  showMadeBy?: boolean;
  gradient?: string; // 👈 TAMBAH INI
}