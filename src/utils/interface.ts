export interface Portfolio {
  about: About;
  email: string;
  timeline: Timeline[];
  skills: Skill[];
  projects: Project[];
  social_handles: SocialHandle[];
  services: Service[];
}

export interface About {
  name: string;
  title: string;
  subTitle: string;
  description1: string;
  description2: string;
  description3: string;
  quote: string;
  exp_year: string;
  address: string;
  some_total: string;
  alternateAvatars: any[];
}

export interface Skill {
  enabled: boolean;
  name: string;
  sequence: number;
  percentage: number;
  _id: string;
}

export interface Project {
  liveurl: string;
  githuburl: string;
  title: string;
  sequence: number;
  image: Image;
  description: string;
  techStack: string[];
  _id: string;
  enabled: boolean;
}

export interface Image {
  public_id: string;
  url: string;
}

export interface SocialHandle {
  platform: string;
  url: string;
  image: Image;
  enabled: boolean;
  _id: string;
}

export interface Service {
  name: string;
  charge: string;
  desc: string;
  enabled: boolean;
  _id: string;
  image: Image;
}

export interface Testimonial {
  image: Image;
  name: string;
  review: string;
  position: string;
  enabled: boolean;
  _id: string;
}

export interface Timeline {
  company_name: string;
  summary: string;
  sequence: number;
  startDate: string;
  endDate: string;
  jobTitle: string;
  jobLocation: string;
  bulletPoints: string[];
  forEducation: boolean;
  enabled: boolean;
  _id: string;
}
