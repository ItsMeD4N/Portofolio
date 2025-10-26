export interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
}
export const blogPosts: BlogPost[] = [
  // {
  //   id: 1,
  //   title: "Animating the Web with GSAP",
  //   category: "Animation",
  //   excerpt:
  //     "Dive deep into the GreenSock Animation Platform to create high-performance, interactive animations.",
  //   author: "Mikael",
  //   date: "Sep 20, 2025",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1554734867-bf3c00a49371?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
  // },
];
