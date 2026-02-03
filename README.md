# gerla.net (Hugo)

Personal site built on the [Anatole](https://github.com/lxndrblz/anatole) Hugo theme. This repo tracks the Hugo sources (content, layouts, assets) plus the generated `/public` output.

## Requirements

- [Hugo Extended](https://gohugo.io/getting-started/installing/) v0.120+ (extended build is required for SCSS pipeline)
- Go 1.21+ if you need to update theme modules via `hugo mod` (optional for day-to-day editing)

## Local development

```sh
hugo server --disableFastRender
```

Key flags:

- `--disableFastRender` keeps the sidebar/menu responsive to template changes.
- Drop `-D/--buildDrafts` unless you specifically want draft content visible.

Site will be available at http://localhost:1313/ with automatic reloads on content, layout, and asset changes.

## Building production output

```sh
hugo
```

This writes the static site to `/public`. Deploy whatever ends up there.

## Creating new content

Use Hugo's built-in generator to scaffold Markdown front matter and directory structures. From the repository root:

```sh
hugo new posts/my-new-post/index.md
```

Notes:

- Replace `posts/my-new-post/index.md` with the desired section (e.g., `projects/new-thing/index.md`).
- The `index.md` style creates a [Page Bundle](https://gohugo.io/content-management/page-bundles/) so you can drop images/files alongside the Markdown.
- Hugo adds `draft: true` by default; publish by setting `draft: false` or removing the line.

## Updating theme modules

If you ever need to pick up upstream Anatole changes:

```sh
hugo mod get -u ./...
```

Commit the resulting `go.mod`, `go.sum`, and anything under `_vendor/` if it changes.
