/**
 * slugify utility
 *
 * Converts a product title into a URL-safe slug used by product routes.
 *
 * Responsibilities:
 *  - normalize display text into route-friendly format
 *  - keep route generation and slug validation consistent
 */

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") //special chars
    .replace(/\s+/g, "-") //spaces to dashes
    .replace(/--+/g, "-"); //dashes collapse
}
