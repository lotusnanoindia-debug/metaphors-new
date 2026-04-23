/**
 * GROQ queries for Metaphors Design
 *
 * Field names are matched exactly to the Sanity schema in studio/schemas/:
 *   - project document (all-projects.ts)
 *   - projectCategory document (projectCategory.ts)
 *
 * Import the sanity client from '../sanity.js' — this project uses
 * @sanity/client directly (not next-sanity).
 */

// ─── 1) All categories — for filters / navigation ───────────────────────────

export const projectCategoriesQuery = `
  *[_type == "projectCategory"] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    displayOrder,
    subcategories[]{
      title,
      slug
    }
  }
`;

// ─── 2) Project listing page: /projects ──────────────────────────────────────
// Excludes heavy narrative fields and full gallery intentionally.

export const projectsListingQuery = `
  *[_type == "project" && isVisible == true]
  | order(orderRank asc, completionYear desc, _createdAt desc) {
    _id,
    _createdAt,
    "title": projectName,
    headline,
    "slug": slug.current,
    projectStatus,
    completionYear,
    "areaSqFt": areaSqFt,
    scopeOfWork,
    "category": category->{
      _id,
      title,
      "slug": slug.current
    },
    subcategorySlug,
    "location": {
      "city": location.city,
      "state": location.state,
      "country": location.country
    },
    "coverImage": {
      "asset": coverImage.asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      "alt": coverImage.alt,
      "caption": coverImage.caption
    }
  }
`;

// ─── 3) Single project detail page: /projects/[slug] ─────────────────────────

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug && isVisible == true][0]{
    _id,
    _createdAt,
    _updatedAt,
    "title": projectName,
    headline,
    "slug": slug.current,

    isVisible,
    projectStatus,
    completionYear,
    projectDuration,
    "areaSqFt": areaSqFt,
    scopeOfWork,

    clientName,
    showClientPublicly,

    "category": category->{
      _id,
      title,
      "slug": slug.current,
      description,
      subcategories[]{
        title,
        slug
      }
    },
    subcategorySlug,

    "location": {
      "city": location.city,
      "state": location.state,
      "country": location.country
    },

    theBrief,
    theDesignResponse,
    theOutcome,
    highlights,

    testimonial{
      quote,
      attribution,
      showPublicly
    },

    awards[]{
      awardName,
      awardingBody,
      year
    },

    seoTitle,
    seoDescription,

    "coverImage": {
      "asset": coverImage.asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      "alt": coverImage.alt,
      "caption": coverImage.caption
    },

    "gallery": gallery[]{
      "asset": asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      caption
    }
  }
`;

// ─── 4) Static paths for Astro getStaticPaths() ──────────────────────────────

export const visibleProjectSlugsQuery = `
  *[_type == "project" && isVisible == true && defined(slug.current)]{
    "slug": slug.current
  }
`;
