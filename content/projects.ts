export type CategoryKey = "automotive" | "livery";

export type Project = {
  title: string;
  slug: string;
  category: CategoryKey;
  folder: string;
  count: number;
  comingSoon?: boolean;

  // thumbnails for category + list cards
  thumb: string;

  // gallery images in /public/work/<category>/<folder>/
  images: string[];
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function buildImages(opts: {
  category: CategoryKey;
  folder: string;
  prefix: string;
  count: number;
  ext?: "jpg" | "png" | "webp";
}) {
  const ext = opts.ext ?? "jpg";
  const base = `/work/${opts.category}/${opts.folder}`;
  return Array.from({ length: opts.count }, (_, i) => {
    const idx = i + 1;
    return `${base}/${opts.prefix}_${pad2(idx)}.${ext}`;
  });
}

function makeProject(opts: {
  title: string;
  slug: string;
  category: CategoryKey;
  folder: string;
  prefix: string;
  count: number;
  comingSoon?: boolean;
  ext?: "jpg" | "png" | "webp";

  /**
   * Thumbnail file base name (without -t.jpg),
   * stored at /public/images/thumbs/<category>/<thumbBase>-t.jpg
   * If omitted, defaults to slug.
   */
  thumbBase?: string;
}): Project {
  const images = buildImages({
    category: opts.category,
    folder: opts.folder,
    prefix: opts.prefix,
    count: opts.count,
    ext: opts.ext ?? "jpg",
  });

  const thumbBase = opts.thumbBase ?? opts.slug;

  return {
    title: opts.title,
    slug: opts.slug,
    category: opts.category,
    folder: opts.folder,
    count: opts.count,
    comingSoon: opts.comingSoon ?? false,
    thumb: `/images/thumbs/${opts.category}/${thumbBase}-t.jpg`,
    images,
  };
}

/* -----------------------------
   PROJECT DATA (your folders)
------------------------------ */

export const projects: Project[] = [
  // Automotive
  makeProject({
    title: "S77 Selachon",
    slug: "s77-selachon",
    category: "automotive",
    folder: "s77_selachon",
    prefix: "s77_selachon",
    count: 1,
    comingSoon: true,
    thumbBase: "s77-selachon",
  }),
  makeProject({
    title: "Mars X1",
    slug: "mars-x1",
    category: "automotive",
    folder: "mars_x1",
    prefix: "mars_x1",
    count: 9,
    thumbBase: "mars-x1",
  }),
  makeProject({
    title: "Rimac CX",
    slug: "rimac-cx",
    category: "automotive",
    folder: "rimac_cx",
    prefix: "rimac_cx",
    count: 10,
    // your file shows rimac-cs-t.jpg; keep this override.
    // if you rename to rimac-cx-t.jpg later, just remove thumbBase.
    thumbBase: "rimac-cs",
  }),
  makeProject({
    title: "Lexus BP",
    slug: "lexus-bp",
    category: "automotive",
    folder: "lexus_bp",
    prefix: "lexus_bp",
    count: 7,
    thumbBase: "lexus-bp",
  }),
  makeProject({
    title: "Motobloq MC01",
    slug: "motobloq-mc01",
    category: "automotive",
    folder: "mb_mc01",
    prefix: "mb_mc01",
    count: 6,
    thumbBase: "mb-mc01",
  }),

  // Livery
  makeProject({
    title: "No Pattern Viper",
    slug: "no-pattern-viper",
    category: "livery",
    folder: "nopattern_viper",
    prefix: "nopattern_viper",
    count: 8,
    thumbBase: "nopattern-viper",
  }),
  makeProject({
    title: "Wicked AMG GTS",
    slug: "wicked-amg-gts",
    category: "livery",
    folder: "wicked_amggts",
    prefix: "wicked_amggts",
    count: 5,
    thumbBase: "wicked-amggts",
  }),
  makeProject({
    title: "Kyle 997",
    slug: "kyle-997",
    category: "livery",
    folder: "kyle_997",
    prefix: "kyle_997",
    count: 4,
    thumbBase: "kyle-997",
  }),
  makeProject({
    title: "Livery Lab",
    slug: "livery-lab",
    category: "livery",
    folder: "livery_lab",
    prefix: "livery_lab",
    count: 6,
    thumbBase: "livery-lab",
  }),
  makeProject({
    title: "Workflow",
    slug: "workflow",
    category: "livery",
    folder: "workflow",
    prefix: "workflow",
    count: 6,
    thumbBase: "workflow",
  }),
  makeProject({
    title: "Marv GTS",
    slug: "marv-gts",
    category: "livery",
    folder: "marv_gts",
    prefix: "marv_gts",
    count: 7,
    thumbBase: "marv-gts",
  }),
];

/* -----------------------------
   HELPERS
------------------------------ */

export function getProjectsByCategory(cat: CategoryKey) {
  return projects.filter((p) => p.category === cat);
}

export function getProject(cat: CategoryKey, slug: string) {
  return projects.find((p) => p.category === cat && p.slug === slug) ?? null;
}
