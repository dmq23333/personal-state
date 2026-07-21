export interface Project {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  highlights: string[];
  role: string;
  period: string;
  links?: { label: string; url: string }[];
}
