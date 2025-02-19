"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";

import { Project } from "../utils/interface";
import { ExternalLink, Github, XMark } from "./ui/Icons";

interface DialogProps {
  selectedProject: Project;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>;
}

const ProjectDialog = ({
  selectedProject,
  setSelectedProject,
}: DialogProps) => {
  return (
    <motion.div
      layoutId={selectedProject._id}
      className="fixed inset-0 z-50 grid place-items-center"
      onClick={() => setSelectedProject(null)}
    >
      <div className="bg-black w-11/12 md:w-1/2 h-4/5 md:h-[90%] overflow-hidden rounded-xl">
        <div className="relative ">
          <img
            src={selectedProject.image.url}
            width={300}
            height={300}
            alt={selectedProject.title}
            className="w-full h-full aspect-video md:aspect-[12/6] object-center"
          />
          <div className="p-3">
            <div className="flex items-center justify-between">
              <h5 className="text-4xl font-bold">{selectedProject.title}</h5>
            </div>
            <div className="py-3 flex items-center gap-4">
              {selectedProject.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 border border-white/40 rounded-2xl text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-white/50">
              {selectedProject.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDialog;
