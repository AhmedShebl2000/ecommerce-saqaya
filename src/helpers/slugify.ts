export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") //special chars
    .replace(/\s+/g, "-") //spaces to dashes
    .replace(/--+/g, "-"); //dashes collapse
}
