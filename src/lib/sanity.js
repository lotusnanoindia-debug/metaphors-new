import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "h05maah4",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  useCdn: false, // `false` if you want to ensure fresh data every build
  apiVersion: "2024-03-01",
});

const builder = createImageUrlBuilder(client);

// Plain builder — used for chaining e.g. urlFor(img).width(800).url()
export function urlFor(source) {
  return builder.image(source);
}

/**
 * imageUrl(source, opts) — builds a Sanity CDN URL and appends the
 * original filename for SEO.
 *
 * @param {object} source  - The Sanity image object (must include asset->)
 * @param {object} opts    - { width, height, quality, fit }
 * @returns {string}       - Final CDN URL
 */
export function imageUrl(source, opts = {}) {
  const { width, height, quality = 70, fit = "crop" } = opts;

  let b = builder.image(source).auto("format").quality(quality);
  if (width) b = b.width(width);
  if (height) b = b.height(height);
  if (width && height) b = b.fit(fit);

  let url = b.url();

  // Append the original filename for SEO if available
  const filename = source?.asset?.originalFilename || source?.originalFilename;

  if (filename && url) {
    url += (url.includes("?") ? "&" : "?") + encodeURIComponent(filename);
  }

  return url;
}

// GROQ Query for MD Projects
export const PROJECTS_QUERY = `*[_type == "project"] | order(orderRank asc){
  title,
  "slug": slug.current,
  location,
  "sector": sector->title,
  intent,
  mainImage {
    ...,
    asset-> {
      ...,
      originalFilename
    }
  },
  stats
}`;

export const SECTORS_QUERY = `*[_type == "sector"] | order(orderRank asc){
  _id,
  title,
  "slug": slug.current,
  "projects": *[_type == "project" && category._ref == ^._id && defined(areaSqFt)]{ areaSqFt },
  menuTagline,
  menuCTA,
  menuImage {
    ...,
    asset-> {
      ...,
      originalFilename
    }
  },
  homeHeadline,
  homeIntro,
  image {
    ...,
    asset-> {
      ...,
      originalFilename
    }
  },
  "starredProjects": *[_type == "project" && category._ref == ^._id && featured == true && isVisible != false] | order(orderRank asc)[0...3]{
    "title": coalesce(projectName, title, headline),
    "slug": slug.current,
    "city": location.city,
    completionYear
  },
  "teaser": coalesce(teaser, homeIntro)
}`;

export const ALL_DISCIPLINES_WITH_AREA_QUERY = `*[_type == "discipline"] | order(orderRank asc){
  _id,
  title,
  "slug": slug.current,
  mainImage {
    asset-> { ..., originalFilename }
  },
  "projects": *[_type == "project" && references(^._id) && defined(areaSqFt)]{ areaSqFt }
}`;

export const DISCIPLINES_QUERY = `*[_type == "discipline"] | order(orderRank asc){
  title,
  "slug": slug.current,
  valueProposition,
  mainImage {
    asset-> { ..., originalFilename }
  }
}`;

// GROQ Query for Global Settings
export const HOME_SETTINGS_QUERY = `*[_type == "settings"][0]{
  heroStatureImage {
     ...,
     asset-> { ..., originalFilename }
  },
  heroPrecisionImage {
     ...,
     asset-> { ..., originalFilename }
  },
  statureTagline
}`;

export const HOMEPAGE_QUERY = `{
  "homepage": *[_type == "homepage" && _id == "homepage"][0]{
    heroSection,
    statureSection {
      ...,
      statureImage {
        ...,
        asset-> { ..., originalFilename }
      },
      precisionImage {
        ...,
        asset-> { ..., originalFilename }
      }
    },
    sectorsSection,
    scaleSection,
    disciplinesSection,
    mainCtaSection
  },
  "quotes": *[_type == "pressQuote"] | order(_createdAt desc){
    ...,
    logo {
      ...,
      asset-> { ..., originalFilename }
    }
  }
}`;

export const EMPLOYEES_QUERY = `*[_type == "employee" && status != "alumni"] | order(orderRank asc){
  _id,
  name,
  "slug": slug.current,
  role,
  experience,
  image,
  body,
  classification,
  status,
  "sectors": sectors[]->{ title, "slug": slug.current },
  "disciplines": disciplines[]->{ title, "slug": slug.current },
  linkedinUrl
}`;

export const PRESS_QUOTES_QUERY = `*[_type == "pressQuote"] | order(_createdAt desc){
  publication,
  quote,
  "logo": logo.asset->,
  sourceType
}`;

export const EVIDENCE_SECTOR_SLIDER_QUERY = `*[_type == "sector"] | order(orderRank asc){
  _id,
  title,
  "slug": slug.current,
  "leadProject": *[_type == "project" && references(^._id) && featured == true][0]{
     title,
     "slug": slug.current,
     location,
     areaSqFt,
     projectStatus,
     completionYear,
     mainImage { ..., asset-> { ..., originalFilename } },
     coverImage { ..., asset-> { ..., originalFilename } },
     headline,
     highlights
  }
}`;
export const SECTOR_DETAIL_QUERY = `{
  "sector": *[_type == "sector" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    menuTagline,
    menuCTA,
    homeHeadline,
    homeIntro,
    "teaser": coalesce(teaser, homeIntro),
    pageHeroHeadline,
    pageHeroSub,
    valueProposition,
    keyPillars[] {
      title,
      description
    },
    "curatedProjects": curatedProjects[]-> {
      "title": coalesce(projectName, title, headline),
      "slug": slug.current,
      location,
      areaSqFt,
      projectStatus,
      headline,
      highlights,
      "client": select(showClientPublicly != false => client->name, null),
      "disciplines": disciplines[]->{ title, "slug": slug.current },
      mainImage { ..., asset-> { ..., originalFilename } },
      coverImage { ..., asset-> { ..., originalFilename } },
      completionYear,
      "sector": sector->title
    },
    "allProjects": *[_type == "project" && references(^._id) && isVisible != false] | order(completionYear desc) {
      "title": coalesce(projectName, title, headline),
      "slug": slug.current,
      "client": select(showClientPublicly != false => client->name, null),
      "disciplines": disciplines[]->{ title, "slug": slug.current },
      location,
      areaSqFt,
      coverImage { ..., asset-> { ..., originalFilename } },
      completionYear
    },
    frameworkDescription,
    customCTA,
    image { ..., asset-> { ..., originalFilename } }
  },
  "homepage": *[_type == "homepage" && _id == "homepage"][0]{
    statureSection {
      precisionImage { ..., asset-> { ..., originalFilename } }
    }
  }
}`;

export const ALL_SECTORS_SLUGS_QUERY = `*[_type == "sector"]{ "slug": slug.current }`;
