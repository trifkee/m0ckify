"use client";

import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { notFound } from "next/navigation";
import { usePathname } from "@/navigation";

import {
  canvasOptionsAtom,
  ObjectsLayersAtom,
  projectListAtom,
  sceneDocumentAtom,
  sceneLightsAtom,
} from "@/lib/atoms/generator";

const interval = 2000;

export default function useSaveProject() {
  const [projects, setProjects] = useRecoilState(projectListAtom);

  const projectId = usePathname().split("/")[2];
  const idExist = Object.keys(projects).includes(projectId);

  !idExist && notFound();

  const timer = useRef<any>(null);

  const [project, setProject] = useState();

  const layers = useRecoilValue(ObjectsLayersAtom);
  const canvas = useRecoilValue(canvasOptionsAtom);
  const lights = useRecoilValue(sceneLightsAtom);
  const env = useRecoilValue(sceneDocumentAtom);

  function captureCanvas() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;

    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      return dataURL;
    }
  }

  function handleTimer() {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setTimeout(() => {
      saveProject();
    }, interval);
  }

  function saveProject() {
    setProject((prev: any) => ({
      ...prev,
      thumbnail: captureCanvas(),
      title: env.title,
      options: {
        layers,
        env,
        lights,
        canvas,
      },
    }));
  }

  useEffect(() => {
    if (idExist) {
      const newObj = {
        thumbnail: captureCanvas(),
        title: env.title,
        options: {
          layers,
          env,
          lights,
          canvas,
        },
      };

      const newProjects = {
        ...projects,
        [projectId]: newObj,
      };

      setProjects((prev: any) => ({ ...prev, [projectId]: newObj }));

      localStorage.setItem("projects", JSON.stringify(newProjects));
    }
  }, [project]);

  useEffect(() => {
    window.addEventListener("mousedown", handleTimer);
    window.addEventListener("keydown", handleTimer);

    return () => {
      window.removeEventListener("mousedown", handleTimer);
      window.removeEventListener("keydown", handleTimer);
      timer.current && clearTimeout(timer.current);
    };
  }, []);

  return null;
}
