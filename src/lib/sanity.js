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
  }
}`;

export const EVIDENCE_SECTOR_SLIDER_QUERY = `*[_type == "sector"] | order(orderRank asc)[0...8]{
  _id,
  title,
  "slug": slug.current,
  homeHeadline,
  homeIntro,
  "leadProject": coalesce(
    *[_type == "project" && isVisible == true && category._ref == ^._id && featured == true] | order(orderRank asc, completionYear desc)[0]{
      _id,
      "title": projectName,
      headline,
      "slug": slug.current,
      projectStatus,
      completionYear,
      areaSqFt,
      highlights,
      "location": {
        "city": location.city,
        "state": coalesce(location.indiaState->title, location.otherState),
        "country": location.country->title
      },
      coverImage,
      mainImage
    },
    *[_type == "project" && isVisible == true && category._ref == ^._id] | order(orderRank asc, completionYear desc)[0]{
      _id,
      "title": projectName,
      headline,
      "slug": slug.current,
      projectStatus,
      completionYear,
      areaSqFt,
      highlights,
      "location": {
        "city": location.city,
        "state": coalesce(location.indiaState->title, location.otherState),
        "country": location.country->title
      },
      coverImage,
      mainImage
    }
  )
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

// GROQ Query for the new Homepage singleton
export const HOMEPAGE_QUERY = `{
  "homepage": *[_type == "homepage" && _id == "homepage"][0]{
    heroEyebrow,
    heroHeadline,
    heroHeadlineAccent,
    heroHeadlineTagline,
    heroSubheading,
    heroCtaLabel,
    heroCtaUrl,
    statureImage {
       ...,
       asset-> { ..., originalFilename }
    },
    precisionImage {
       ...,
       asset-> { ..., originalFilename }
    },
    scaleEyebrow,
    scaleHeadline,
    scaleBody,
    featuredSectionEyebrow,
    featuredSectionHeadline,
    featuredProjects[]{
      ...,
      image {
        ...,
        asset-> { ..., originalFilename }
      }
    }
  },
  "quotes": *[_type == "pressQuote"] | order(_createdAt desc){
    ...,
    logo {
      ...,
      asset-> { ..., originalFilename }
    }
  }
}`;
