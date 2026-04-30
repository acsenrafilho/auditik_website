import fs from "fs";
import path from "path";

import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import {
  CONVENIO_AREAS,
  CONVENIO_BENEFIT_TYPES,
  CONVENIO_CITIES,
  CONVENIO_CLIENT_PROFILES,
  type ConvenioTagOption,
} from "@lib/convenios-taxonomy";

export interface ConvenioPartner {
  slug: string;
  name: string;
  initials: string;
  description: string;
  address: string;
  phone: string;
  googleMapsUrl: string;
  logo?: string;
  featured: boolean;
  cities: string[];
  cityLabels: string[];
  areas: string[];
  areaLabels: string[];
  benefitTypes: string[];
  benefitTypeLabels: string[];
  clientProfiles: string[];
  clientProfileLabels: string[];
  benefitSummary: string;
  gallery: string[];
  content: string;
  searchText: string;
}

const conveniosDirectory = path.join(process.cwd(), "content/convenios");

const markdownRenderer = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true,
});

function normalizeSearchText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeSlug(value: string): string {
  return normalizeSearchText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitleCase(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);

  if (words.length === 0) {
    return "PA";
  }

  return words
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
}

function getOptionLabel(value: string, options: readonly ConvenioTagOption[]): string {
  const normalizedValue = normalizeSlug(value);
  return (
    options.find((option) => normalizeSlug(option.value) === normalizedValue)?.label ||
    toTitleCase(value)
  );
}

function normalizeTagList(
  value: unknown,
  options: readonly ConvenioTagOption[],
): string[] {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === "string"
    ? value.split(",")
    : [];

  const mappedValues = rawValues
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean)
    .map((entry) => {
      const normalizedEntry = normalizeSlug(entry);
      const matchedOption = options.find(
        (option) => normalizeSlug(option.value) === normalizedEntry,
      );
      return matchedOption ? matchedOption.value : normalizedEntry;
    });

  return Array.from(new Set(mappedValues));
}

function normalizeUrlList(value: unknown): string[] {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === "string"
    ? value.split(",")
    : [];

  return Array.from(
    new Set(
      rawValues
        .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
        .filter(Boolean)
        .filter((entry) => /^https?:\/\//i.test(entry)),
    ),
  );
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(conveniosDirectory)) {
    return [];
  }

  return fs
    .readdirSync(conveniosDirectory)
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .filter((fileName) => !fileName.startsWith(".template"))
    .filter((fileName) => fileName !== "index.md");
}

function buildConvenioPartner(fileName: string, fileContents: string): ConvenioPartner {
  const fileSlug = fileName.replace(/\.mdx?$/, "");
  const { data, content } = matter(fileContents);

  const name =
    typeof data.name === "string" && data.name.trim() ? data.name.trim() : fileSlug;
  const slug =
    typeof data.slug === "string" && data.slug.trim()
      ? normalizeSlug(data.slug)
      : normalizeSlug(fileSlug);

  const cities = normalizeTagList(data.cities, CONVENIO_CITIES);
  const areas = normalizeTagList(data.areas, CONVENIO_AREAS);
  const benefitTypes = normalizeTagList(data.benefitTypes, CONVENIO_BENEFIT_TYPES);
  const clientProfiles = normalizeTagList(
    data.clientProfiles,
    CONVENIO_CLIENT_PROFILES,
  );

  const cityLabels = cities.map((value) => getOptionLabel(value, CONVENIO_CITIES));
  const areaLabels = areas.map((value) => getOptionLabel(value, CONVENIO_AREAS));
  const benefitTypeLabels = benefitTypes.map((value) =>
    getOptionLabel(value, CONVENIO_BENEFIT_TYPES),
  );
  const clientProfileLabels = clientProfiles.map((value) =>
    getOptionLabel(value, CONVENIO_CLIENT_PROFILES),
  );

  const description =
    typeof data.description === "string"
      ? data.description.trim()
      : "Benefício exclusivo para clientes Auditik.";
  const address = typeof data.address === "string" ? data.address.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const googleMapsUrl =
    typeof data.googleMapsUrl === "string" ? data.googleMapsUrl.trim() : "";
  const benefitSummary =
    typeof data.benefitSummary === "string" && data.benefitSummary.trim()
      ? data.benefitSummary.trim()
      : description;
  const gallery = normalizeUrlList(data.gallery).slice(0, 4);
  const normalizedContent = content.trim();

  const searchText = normalizeSearchText(
    [
      name,
      description,
      address,
      phone,
      googleMapsUrl,
      benefitSummary,
      ...gallery,
      ...cityLabels,
      ...areaLabels,
      ...benefitTypeLabels,
      ...clientProfileLabels,
      normalizedContent,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return {
    slug,
    name,
    initials: getInitials(name),
    description,
    address,
    phone,
    googleMapsUrl,
    logo: typeof data.logo === "string" ? data.logo : undefined,
    featured: Boolean(data.featured),
    cities,
    cityLabels,
    areas,
    areaLabels,
    benefitTypes,
    benefitTypeLabels,
    clientProfiles,
    clientProfileLabels,
    benefitSummary,
    gallery,
    content: normalizedContent,
    searchText,
  };
}

export function getAllConvenioPartners(): ConvenioPartner[] {
  const partners = getMarkdownFiles().map((fileName) => {
    const fullPath = path.join(conveniosDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return buildConvenioPartner(fileName, fileContents);
  });

  return partners.sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    return left.name.localeCompare(right.name, "pt-BR");
  });
}

export function getConvenioPartnerBySlug(slug: string): ConvenioPartner | null {
  const normalizedSlug = normalizeSlug(slug);
  if (!normalizedSlug) {
    return null;
  }

  return (
    getAllConvenioPartners().find((partner) => partner.slug === normalizedSlug) || null
  );
}

export function getAllConvenioSlugs(): string[] {
  return getAllConvenioPartners().map((partner) => partner.slug);
}

export function renderConvenioMarkdownToHtml(content: string): string {
  return markdownRenderer.render(content);
}

export function normalizeConvenioSearchValue(value: string): string {
  return normalizeSearchText(value);
}

export async function getConvenioGalleryFromMaps(
  googleMapsUrl: string,
  maxImages = 4,
): Promise<string[]> {
  if (!googleMapsUrl) {
    return [];
  }

  try {
    const response = await fetch(googleMapsUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const imageUrls = new Set<string>();

    const ogImageRegex =
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/gi;
    const googlePhotoRegex =
      /https:\/\/lh[0-9]-googleusercontent\.com\/p\/[^"'\s<>\\]+/gi;

    for (const match of html.matchAll(ogImageRegex)) {
      const imageUrl = match[1]?.trim();
      if (imageUrl && /^https?:\/\//i.test(imageUrl)) {
        imageUrls.add(imageUrl);
      }
    }

    for (const match of html.matchAll(googlePhotoRegex)) {
      const imageUrl = match[0]?.trim();
      if (imageUrl) {
        imageUrls.add(imageUrl);
      }
    }

    return Array.from(imageUrls).slice(0, maxImages);
  } catch (error) {
    console.warn("Could not extract Google Maps gallery:", error);
    return [];
  }
}
