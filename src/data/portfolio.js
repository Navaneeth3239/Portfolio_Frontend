import projectLifeflow from "@/assets/project-lifeflow.jpg";
import projectFlourishfit from "@/assets/project-flourishfit.jpg";
import projectFeedback from "@/assets/project-feedback.jpg";
import certificateCreativity from "@/assets/certificate-creativity.jpg";

export const profile = {
  name: "Navaneeth B",
  firstName: "Navaneeth",
  title: "Full Stack Developer",
  roles: ["Full Stack Developer", "MERN Stack Engineer", "Problem Solver", "Tech Enthusiast"],
  tagline:
  "I build practical, scalable web applications that solve real-world problems with clean, modern engineering.",
  about:
  "I'm a Computer Engineering student passionate about Full Stack Development, Artificial Intelligence, Cybersecurity and Cloud Computing. I enjoy building practical applications that solve real-world problems using scalable technologies and modern software engineering practices.",
  location: "Udumalpet, Tamil Nadu, India",
  email: "navaneeth3239@gmail.com",
  phone: "+91 98650 13239",
  phoneRaw: "919865013239",
  github: "https://github.com/Navaneeth3239",
  linkedin: "https://www.linkedin.com/in/navaneeth-b-74a4143ab",
  address: "Udumalpet, Tiruppur, Tamil Nadu",
  initials: "NB"
};

export const stats = [
{ label: "Projects Built", value: 3, suffix: "+" },
{ label: "Technologies", value: 15, suffix: "+" },
{ label: "Certificates", value: 1, suffix: "" },
{ label: "Current CGPA", value: 9.2, suffix: "/10", decimals: 1 }];








export const skillGroups = [
{
  category: "Programming",
  icon: "code",
  skills: [
  { name: "Python", level: 85, icon: "SiPython" },
  { name: "JavaScript", level: 88, icon: "SiJavascript" }]

},
{
  category: "Frontend",
  icon: "layout",
  skills: [
  { name: "HTML", level: 95, icon: "SiHtml5" },
  { name: "CSS", level: 90, icon: "SiCss" },
  { name: "Tailwind CSS", level: 92, icon: "SiTailwindcss" },
  { name: "React", level: 88, icon: "SiReact" }]

},
{
  category: "Backend",
  icon: "server",
  skills: [
  { name: "Node.js", level: 85, icon: "SiNodedotjs" },
  { name: "Express.js", level: 83, icon: "SiExpress" }]

},
{
  category: "Database",
  icon: "database",
  skills: [
  { name: "MongoDB", level: 82, icon: "SiMongodb" }]

},
{
  category: "Tools",
  icon: "wrench",
  skills: [
  { name: "Git", level: 88, icon: "SiGit" },
  { name: "GitHub", level: 90, icon: "SiGithub" },
  { name: "VS Code", level: 92, icon: "code2" },
  { name: "Linux", level: 80, icon: "SiLinux" },
  { name: "Postman", level: 85, icon: "SiPostman" },
  { name: "Canva", level: 88, icon: "SiCanva" }]

}];














export const projects = [
{
  title: "Life Flow",
  subtitle: "Blood Bank Management System",
  description:
  "A responsive web-based blood bank platform connecting donors with patients. Includes donor registration, OTP authentication, blood search, urgent requests and an admin dashboard.",
  image: projectLifeflow,
  tech: ["HTML", "Tailwind CSS", "JavaScript", "Node.js"],
  features: ["OTP Authentication", "Blood Search", "Urgent Requests", "Admin Dashboard", "Dark Mode"],
  demo: "https://life-flow-ten.vercel.app",
  accent: "from-rose-500 to-red-500"
},
{
  title: "Flourish-Fit",
  subtitle: "Fitness & Wellness Platform",
  description:
  "A MERN stack fitness platform to track workouts, monitor progress and achieve health goals with a modern, responsive and user-friendly experience.",
  image: projectFlourishfit,
  tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
  features: ["Workout Tracking", "Progress Charts", "Goal Setting", "Responsive UI"],
  github: "https://github.com/Navaneeth3239/flourish-fit",
  accent: "from-emerald-500 to-teal-500"
},
{
  title: "College Feedback System",
  subtitle: "Structured Feedback & Reports",
  description:
  "A feedback system that collects student feedback and generates structured reports as PDF. Built to handle a large number of users efficiently and reliably.",
  image: projectFeedback,
  tech: ["React", "Node.js", "Express.js", "Tailwind CSS", "MongoDB"],
  features: ["Feedback Collection", "PDF Report Export", "Scalable Backend", "Clean UI"],
  github: "https://github.com/Navaneeth3239/NPTC_Feedback_Frontend",
  accent: "from-blue-500 to-cyan-500"
}];


export const experience = [
{
  role: "Academic Project Developer",
  org: "Nachimuthu Polytechnic College",
  period: "2025 — Present",
  description:
  "Designed and developed a full-stack College Feedback System for senior students, collecting feedback and generating structured PDF reports."
},
{
  role: "MERN Stack Learner & Builder",
  org: "Self-Driven / Freelance",
  period: "2024 — Present",
  description:
  "Continuously building projects across the MERN stack, exploring APIs, databases and cloud technologies to solve real-world problems."
},
{
  role: "Hackathons & Coding Challenges",
  org: "Various",
  period: "Ongoing",
  description:
  "Actively participate in hackathons and coding challenges, sharpening problem-solving and teamwork skills."
}];


export const education = [
{
  school: "Nachimuthu Polytechnic College, Pollachi",
  degree: "Diploma in Computer Engineering",
  period: "2024 — 2027",
  detail: "CGPA: 9.20 / 10.00 · Currently 2nd Year"
}];


export const certificates = [
{
  title: "Certificate of Creativity",
  org: "NP Skills Foundation",
  date: "17 June 2026",
  category: "Achievement",
  image: certificateCreativity
}];


export const languages = ["English", "Tamil"];

export const interests = [
"Artificial Intelligence",
"Web Development",
"Linux",
"Cloud Computing",
"Cybersecurity",
"Freelancing"];