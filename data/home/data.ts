// data/home.ts
export interface MenuItemData {
  link: string;
  text: string;
  image: string;
}

export const menuItems: MenuItemData[] = [
  {
    link: "/service",
    text: "Artificial Intelligence",
    image: "/images/services/ai.png"
  },
  {
    link: "/service",
    text: "Web Development",
    image: "/images/services/commerce.png"
  },
  {
    link: "/service",
    text: "UI/UX Design",
    image: "/images/services/ux.png"
  },
    {
    link: "/project",
    text: "Lets see our project",
    image: '/project/bki/PosterBKIDenganTulisani.png'
  },
    {
    link: "/aboutus",
    text: "About us",
    image: "/aboutus/aboutus1.jpg"
  },
    {
    link: "/coollaboration",
    text: "Coollaboration",
    image: "/aboutus/aboutus7.jpg"
  }
];

// Kalau mau data lain juga bisa ditambah di sini
export const heroData = {
  title: "You imagine. We build.",
  subtitle: "WEB DEVELOPMENT / UI/UX DESIGN / AI ENGINEER",
  buttons: [
    { text: "Collaboration Now", href: "/Collaboration", variant: "primary" },
    { text: "About Us", href: "/aboutus", variant: "secondary" }
  ]
};