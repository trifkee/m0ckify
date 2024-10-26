"use client";

import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import { useRecoilState } from "recoil";
import Image, { StaticImageData } from "next/image";
import { Link } from "@/navigation";

import Button from "../atoms/Button.atom";

import { projectListAtom } from "@/lib/atoms/generator";
import { ModelType } from "@/lib/types/model.type";

import { LucideCopy, LucideTrash2 } from "lucide-react";

export default function ProjectCard({
  id,
  project,
  img,
  index,
}: {
  index: number;
  id: string;
  project: ModelType | unknown;
  img: StaticImageData;
}) {
  const [projects, setProjects] = useRecoilState(projectListAtom);

  function handleDeleteProject() {
    const updatedProjects = Object.fromEntries(
      Object.entries(projects).filter(([key, value]) => key !== id)
    );

    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }

  function handleCopyProject() {
    const newId = uuid();
    const updatedProjects = { ...projects, [newId]: project };

    setProjects((prev: any) => ({ ...prev, [newId]: project }));
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }

  return (
    <motion.article
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.2,
          delay: index * 0.1,
        },
      }}
      exit={{
        opacity: 0,
      }}
      className="card"
      key={id}
    >
      <Link className="card__image" href={`/generate/${id}`}>
        <Image
          // {/* @ts-ignore */}
          src={project.thumbnail ?? img}
          width={1920}
          height={1080}
          alt="Mockify - Generate free mockups online"
        />
      </Link>
      <div className="card__title">
        {/* @ts-ignore */}
        <p>{project?.title}</p>

        <div className="actions">
          <Button variant="editor" onClick={handleCopyProject}>
            <LucideCopy />
          </Button>
          <Button
            variant="editor"
            onClick={handleDeleteProject}
            className="danger"
          >
            <LucideTrash2 />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
