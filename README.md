# Handcrafted Haven

**Handcrafted Haven** is a web application designed to connect artisans and crafters with customers seeking unique, handmade products. It serves as a virtual marketplace where sellers can create profiles, showcase their items, and engage with buyers. Our goal is to support small creators, promote sustainability, and foster a sense of community through digital craftsmanship.

## Features
- Seller profiles with bios and curated item listings
- Product catalog with filtering by category and price
- User ratings and written reviews
- Responsive and accessible design using modern web standards
- Built with Next.js, Tailwind CSS, Node.js, and deployed via Vercel

## Group Members
- Mitchel Drennan
- Kerri Morris
- Jovanny Rey
- Gabriel Aguilera

## Contributing Workflow

To help us collaborate smoothly, please follow this workflow when working on the project.

### Branching Strategy

- Do **not** work directly on the `main` branch.
- All new work should branch off of `dev`.

Steps to start working on a new task:

```bash
git checkout dev
git pull origin dev
git checkout -b your-branch-name
```

### Pushing Code & Pull Requests

1. Push your branch to GitHub:

```bash
git push origin feature/your-branch-name
```

2. Create a **Pull Request** (PR) into the `dev` branch.
3. **Request a code review** from at least one teammate before merging.
4. After the PR is approved and merged:
   - Delete the branch on GitHub.
   - Update your local `dev` branch:

```bash
git checkout dev
git pull origin dev
```

### Enforcing PR Reviews

Branch protection rules are enabled on `dev`. This means:

- **All changes must go through a pull request (PR)**
- **At least one team member must review and approve the PR**
- **Direct pushes to `dev` are blocked**

This helps prevent accidental changes. If you’re unsure how to request a review, ask in the group chat.

### Summary

- Never commit directly to `main`.
- Always branch from `dev`.
- Submit PRs and request reviews before merging.
- Delete branch after merging.
- Keep your local `dev` updated after every merge.

When in doubt, ask questions in the group chat. We're all here to help each other.
