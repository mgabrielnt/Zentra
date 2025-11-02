export interface ProjectCard {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
  logoText?: string;
  logoGradient?: string;
  madeByText?: string;
  categoryBadgeColor?: string;
  showMadeBy?: boolean;
}