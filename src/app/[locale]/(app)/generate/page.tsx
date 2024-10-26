"use client";

import { useRecoilState } from "recoil";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";

import { LucideFilePlus2 } from "lucide-react";
import { v4 as uuid } from "uuid";

import {
  DEFAULT_CANVAS_OPTIONS,
  DEFAULT_ENV_OPTIONS,
  DEFAULT_LIGHT_OPTIONS,
  DEFAULT_OBJECT_OPTIONS,
} from "@/lib/constants/generator";

import img from "@/public/images/mockify-starter.jpg";
import { isWindowsUndefined } from "@/lib/helpers/helpers";
import ProjectCard from "@/ui/components/moleculs/ProjectCard.molecul";
import { projectListAtom } from "@/lib/atoms/generator";

import "@/ui/styles/pages/generateMenu.page.scss";

export default function Generate() {
  const [projects, setProjects] = useRecoilState(projectListAtom);

  function handleCreateNewProject() {
    if (isWindowsUndefined()) {
      const newProjectID = uuid();

      const project = {
        id: newProjectID,
        title: "Untitled",
        options: {
          layers: [DEFAULT_OBJECT_OPTIONS],
          env: DEFAULT_ENV_OPTIONS,
          lights: DEFAULT_LIGHT_OPTIONS,
          canvas: DEFAULT_CANVAS_OPTIONS,
        },
      };

      const arr = { ...projects, [newProjectID]: project };

      setProjects((prev: any) => ({ ...prev, [newProjectID]: project }));
      localStorage.setItem(`projects`, JSON.stringify(arr));
    }
  }

  return (
    <Suspense fallback={null}>
      <main className="generate-menu">
        <section className="generate-menu__cards">
          <article onClick={handleCreateNewProject} className="card add-new">
            <p className="card__title">
              <LucideFilePlus2 />
              <span>Create new Project</span>
            </p>
          </article>
          <AnimatePresence>
            {Object.entries(projects).map(([key, project], i) => {
              return (
                <ProjectCard
                  img={img}
                  key={key}
                  id={key}
                  index={i}
                  project={project}
                />
              );
            })}
          </AnimatePresence>
        </section>
      </main>
    </Suspense>
  );
}
