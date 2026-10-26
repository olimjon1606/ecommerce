
export function getProjectSlug(project) {
  return String(project.projectName || project.title || "project")
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProjectUrl(project) {
  return `/${getProjectSlug(project)}_${project.id}`;
}
