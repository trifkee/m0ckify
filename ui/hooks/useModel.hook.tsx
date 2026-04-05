"use client";

import { ChangeEvent } from "react";

import { ObjectsLayersAtom, selectedLayerAtom } from "@/lib/atoms/generator";
import { ModelType } from "@/lib/types/model.type";

import { readUserImage } from "@/lib/helpers/model";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function useModel() {
  const selectedLayer = useRecoilValue(selectedLayerAtom);
  const setModel = useSetRecoilState(ObjectsLayersAtom);
  const setSelectedLayer = useSetRecoilState(selectedLayerAtom);

  function toFiniteNumber(rawValue: string, fallbackValue: number) {
    const parsedValue = Number(rawValue);
    return Number.isFinite(parsedValue) ? parsedValue : fallbackValue;
  }

  function handleChangeColor(color: string) {
    setModel((prev) =>
      prev.map((n) => (n.id === selectedLayer?.id ? { ...n, color } : n))
    );
  }

  const handleChangeReflection = (
    e: any,
    type: "screen" | "phone" | "screenAlpha"
  ) => {
    if (type === "screenAlpha") {
      return setModel((prev) =>
        prev.map((n) =>
          n.id === selectedLayer?.id
            ? {
                ...n,
                screenAlphaReflection: e.target.value,
              }
            : n
        )
      );
    }

    if (type === "phone") {
      return setModel((prev) =>
        prev.map((n) =>
          n.id === selectedLayer?.id
            ? {
                ...n,
                bodyReflection: e.target.value,
              }
            : n
        )
      );
    }

    if (type === "screen") {
      return setModel((prev) =>
        prev.map((n) =>
          n.id === selectedLayer?.id
            ? {
                ...n,
                screenReflection: e.target.checked ? 1 : 0,
              }
            : n
        )
      );
    }
  };

  const handleModelChange = (e: any) => {
    const type = e.target.value;

    return setModel((prev) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              type,
            }
          : n
      )
    );
  };

  const handleImageSize = (e: any, type: "width" | "height") => {
    const size = Number(e.target.value);

    setModel((prev) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              image: {
                ...n.image,
                [type]: size,
              },
            }
          : n
      )
    );
  };

  const handleImagePosition = (e: any, position: "x" | "y") => {
    const positionVal = Number(e.target.value);

    setModel((prev) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              image: {
                ...n.image,
                [position]: positionVal,
              },
            }
          : n
      )
    );
  };

  function handleChangeRotation(
    e: ChangeEvent<HTMLInputElement>,
    axis: "x" | "y" | "z"
  ) {
    if (!selectedLayer) return;

    return handleSetTransform({
      rotation: {
        ...selectedLayer.layer.rotation,
        [axis]: toFiniteNumber(
          e.target.value,
          selectedLayer.layer.rotation[axis]
        ),
      },
    });
  }

  function handleSetTransform(transform: {
    position?: ModelType["position"];
    rotation?: ModelType["rotation"];
  }) {
    setModel((prev) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              ...(transform.position ? { position: transform.position } : {}),
              ...(transform.rotation ? { rotation: transform.rotation } : {}),
            }
          : n
      )
    );

    setSelectedLayer((prev) => {
      if (!prev || prev.id !== selectedLayer?.id) return prev;

      return {
        id: prev.id,
        layer: {
          ...prev.layer,
          ...(transform.position ? { position: transform.position } : {}),
          ...(transform.rotation ? { rotation: transform.rotation } : {}),
        },
      };
    });
  }

  function handleSetPosition(position: ModelType["position"]) {
    return handleSetTransform({ position });
  }

  function handleChangePosition(
    e: ChangeEvent<HTMLInputElement>,
    axis: "x" | "y" | "z"
  ) {
    if (!selectedLayer) return;

    return handleSetPosition({
      ...selectedLayer.layer.position,
      [axis]: toFiniteNumber(
        e.target.value,
        selectedLayer.layer.position[axis]
      ),
    });
  }

  function handleSyncPivotPosition(position: ModelType["position"]) {
    if (!selectedLayer) return;

    return handleSetPosition(position);
  }

  function handleSyncPivotTransform(transform: {
    position: ModelType["position"];
    rotation: ModelType["rotation"];
  }) {
    if (!selectedLayer) return;

    return handleSetTransform(transform);
  }

  /* Read image from user PC */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image) return;

    handleReadImage(image);
  };

  const handleReadAIImage = (image: string) => {
    setModel((prev) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              image: { ...n.image, src: image, isDefault: false },
            }
          : n
      )
    );
  };

  const handleDraggedImage = (e: any, index?: number) => {
    e.preventDefault();

    const image = e.dataTransfer.files;

    handleReadImage(image[0]);
  };

  const handleReadImage = (file: File) => {
    readUserImage(file)
      .then((result) => {
        if (typeof result === "string") {
          setModel((prev) =>
            prev.map((n) =>
              n.id === selectedLayer?.id
                ? {
                    ...n,
                    image: { ...n.image, src: result, isDefault: false },
                  }
                : n
            )
          );
        } else {
          console.error("Invalid image result", result);
        }
      })
      .catch((error) => {
        console.error("Error reading image", error);
      });
  };

  // const handleChangeModelTexture = (e: any) => {
  //   // TODO :FIX THIS
  //   // setModel((prev: ModelType) => ({
  //   //   ...prev,
  //   //   texture: e.target.name,
  //   // }));
  // };

  function handleChangeModelStyle(e: ChangeEvent<HTMLInputElement>) {
    setModel((prev) =>
      prev.map((n) =>
        n.id === selectedLayer?.id ? { ...n, realistic: e.target.checked } : n
      )
    );
  }

  return {
    handleChangeModelStyle,
    handleChangeReflection,
    handleChangeColor,
    handleModelChange,
    handleImageChange,
    handleReadAIImage,
    handleDraggedImage,
    handleImagePosition,
    handleImageSize,
    handleChangeRotation,
    handleChangePosition,
    handleSyncPivotPosition,
    handleSyncPivotTransform,
  };
}
