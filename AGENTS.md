# Project architecture rules

- The homepage starts with `ScrollVideoHero`; keep `FloatingNav` above it and preserve the content sequence after the hero because the scroll film is the primary homepage experience.
- Company news (`/aktualnosci`) lives in the `news` table, separate from the static blog (`/blog`); public reads only `published = true` rows and writes require the `admin` role via `has_role`, so content is managed in the database, never hardcoded.
- Generate public prerenders only as route directories with index.html and lightweight sibling HTML redirects; validate all output after prerendering to prevent duplicate content and binary-download regressions.
- Normalize runtime and static structured URLs with the shared SEO URL helpers; this keeps metadata consistent across hydration.