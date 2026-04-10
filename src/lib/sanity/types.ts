// ─── Shared image shape ───────────────────────────────────────────────────────

export interface SanityImageAsset {
  _id: string
  url: string
  metadata?: {
    lqip?: string
    dimensions?: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}

export interface SanityImageRef {
  asset?: SanityImageAsset
  alt?: string
  caption?: string
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface ProjectCategory {
  _id: string
  title: string
  slug: string
  description?: string
  displayOrder?: number
  subcategories?: {
    title: string
    slug: string
  }[]
}

// Schema uses plain string slug on subcategories (not a Sanity slug object),
// so subcategories[].slug is typed as string directly.

// ─── Listing card (light — no narrative, no gallery) ─────────────────────────

export interface ProjectCardData {
  _id: string
  _createdAt: string
  /** Mapped from schema field `projectName` */
  title: string
  headline?: string
  slug: string
  /** Schema values: 'Completed' | 'Ongoing' | 'On Hold' | 'Concept' */
  projectStatus?: 'Completed' | 'Ongoing' | 'On Hold' | 'Concept'
  completionYear?: number
  /** Schema field: areaSqFt */
  areaSqFt?: number
  scopeOfWork?: string[]
  category?: {
    _id: string
    title: string
    slug: string
  }
  subcategorySlug?: string
  location?: {
    city?: string
    state?: string
    country?: string
  }
  coverImage?: SanityImageRef
}

// ─── Detail page (full — adds narrative, gallery, meta) ──────────────────────

export interface ProjectDetailData extends ProjectCardData {
  _updatedAt: string
  projectDuration?: string
  clientName?: string
  /** Schema field: showClientPublicly */
  showClientPublicly?: boolean
  /** Schema field: theBrief */
  theBrief?: string
  /** Schema field: theDesignResponse */
  theDesignResponse?: string
  /** Schema field: theOutcome */
  theOutcome?: string
  /** Schema field: highlights (max 6) */
  highlights?: string[]
  testimonial?: {
    quote?: string
    attribution?: string
    /** Schema field: showPublicly (not showTestimonial) */
    showPublicly?: boolean
  }
  awards?: {
    awardName?: string
    /** Schema field: awardingBody */
    awardingBody?: string
    /** Schema field: year */
    year?: number
  }[]
  seoTitle?: string
  seoDescription?: string
  gallery?: SanityImageRef[]
}
