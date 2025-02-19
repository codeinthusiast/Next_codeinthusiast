"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { SectionHeading, TextReveal } from "./ui/Typography";
import { Project } from "../utils/interface";
import ProjectDialog from "./ProjectDialog";
import { ArrowUpRight } from "./ui/Icons";
import Filters from "./filters";
import { useVariants } from "../utils/hooks";
import { SlideIn, Transition } from "./ui/Transitions";

interface ProjectsProps {
  projects: Project[];
}

function Projects({ projects }: ProjectsProps) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [filterValue, setFilterValue] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const numProjectToShow = 6;

  useEffect(() => {
    const filtered = applyFilters(projects, filterValue);
    setFilteredProjects(filtered);
  }, [filterValue, projects]);

  const applyFilters = (data: Project[], filterValues: string) => {
    return data;
  };

  return (
    <section className="md:p-8 p-4 mt-10 relative container" id="portfolio" style={{marginLeft: "10%", marginRight: "10%"}}>
      <SectionHeading className="md:pl-12">
        <SlideIn className="text-white text-[35px]">PORTFOLIO</SlideIn>
      </SectionHeading>

      <motion.div className="grid lg:grid-cols-3 grid-cols-2 md:gap-6 gap-3 relative">
        {filteredProjects
          .map((project, index) => (
            <Transition
              transition={{ delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              key={project._id}
              layoutId={project._id}
              onClick={() => {
                setSelectedProject(project);
              }}
            >
              <Card {...project} />
            </Transition>
          ))}
        <AnimatePresence>
          {selectedProject && (
            <div className="rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col">
              <ProjectDialog
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default Projects;

const Card = ({ title, image, description }: Project) => {
  const [hover, setHover] = useState(false);
  const { setVariant } = useVariants();

  const mouseEnter = () => {
    setHover(true);
    setVariant("PROJECT");
  };
  const mouseLeave = () => {
    setHover(false);
    setVariant("DEFAULT");
  };

  return (
    <motion.div
      layout
      className="relative rounded-xl md:rounded-3xl overflow-hidden aspect-square bg-secondary/30 md:px-4"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={{cursor: "pointer"}}
    >
      <div className="md:py-8 relative">
        <motion.div
          animate={{ y: hover ? -10 : 0 }}
          className="flex justify-between items-center max-md:hidden"
        >
          <p className="text-sm md:text-xl font-semibold max-md:opacity-0">
            {title}
          </p>
        </motion.div>
      </div>
      <img
        src={image.url}
        width={500}
        height={500}
        alt={title}
        className="h-full w-full object-center rounded-xl md:rounded-t-3xl"
      />
    </motion.div>
  );
};
