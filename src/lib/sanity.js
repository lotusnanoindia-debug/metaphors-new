import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "h05maah4",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  useCdn: true, // `false` if you want to ensure fresh data every build
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

// GROQ Query for MD Sectors
export const SECTORS_QUERY = `*[_type == "sector"]{
  title,
  "slug": slug.current,
  focus,
  approach,
  proof,
  image {
    ...,
    asset-> {
      ...,
      originalFilename
    }
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
  }
}`;
