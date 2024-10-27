"use client";

import { useRecoilState } from "recoil";
import { AnimatePresence } from "framer-motion";
import { Suspense, useEffect } from "react";

import { LucideFilePlus2 } from "lucide-react";
import { v4 as uuid } from "uuid";

import Navigation from "@/ui/components/moleculs/Navigation.molecul";
import ProjectCard from "@/ui/components/moleculs/ProjectCard.molecul";

import {
  DEFAULT_CANVAS_OPTIONS,
  DEFAULT_ENV_OPTIONS,
  DEFAULT_LIGHT_OPTIONS,
  DEFAULT_OBJECT_OPTIONS,
} from "@/lib/constants/generator";
import { isWindowsUndefined } from "@/lib/helpers/helpers";
import { projectListAtom } from "@/lib/atoms/generator";

import img from "@/public/images/mockify-starter.jpg";

import "@/ui/styles/pages/generateMenu.page.scss";

export default function Generate({
  params: { locale },
}: {
  params: { locale: string };
}) {
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
    <main className="generate-menu">
      <Navigation locale={locale} />

      <article className="generate-menu__cards">
        <article onClick={handleCreateNewProject} className="card add-new">
          <p className="card__title">
            <LucideFilePlus2 />
            <span>Create new Project</span>
          </p>
        </article>
        <AnimatePresence>
          {/* TODO: FIX THIS , TEMPORARY SOLUTION */}
          {projects !== null &&
            Object?.entries(projects)?.map(([key, project], i) => {
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
      </article>
    </main>
  );
}
