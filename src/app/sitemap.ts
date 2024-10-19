import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://m0ckify.vercel.app",
      lastModified: new Date(),
      alternates: {
        languages: {
          sr: "https://m0ckify.vercel.app/sr",
          fr: "https://m0ckify.vercel.app/fr",
          ch: "https://m0ckify.vercel.app/ch",
          ru: "https://m0ckify.vercel.app/ru",
          en: "https://m0ckify.vercel.app/en",
          de: "https://m0ckify.vercel.app/de",
        },
      },
    },
    {
      url: "https://m0ckify.vercel.app/generate",
      lastModified: new Date(),
      alternates: {
        languages: {
          sr: "https://m0ckify.vercel.app/sr/generate",
          fr: "https://m0ckify.vercel.app/fr/generate",
          ch: "https://m0ckify.vercel.app/ch/generate",
          ru: "https://m0ckify.vercel.app/ru/generate",
          en: "https://m0ckify.vercel.app/en/generate",
          de: "https://m0ckify.vercel.app/de/generate",
        },
      },
    },
  ];
}
