# Functional requirements
## Product listing

- Display a grid of products fetched from https://dummyjson.com/products
- Show product card with image, name, price, category, and rating
- List revalidates every 24 hours (ISR)

## Product detail

- Clicking a card navigates to `/products/[id]`
- Shows full product info: description, stock, discount, brand, images
- Pages are pre-generated at build time (SSG)

## Search

- Search bar filters products by name in real time
- Uses TanStack Query with debounce — only fires after the user stops typing

## Vault (saved products)

- User can save/unsave any product from the listing or detail page
- Saved products are persisted in `localStorage`
- `/vault` page shows the saved collection with the option to remove items

## Category filter

- Filter products by category on the listing page
- Categories fetched from https://dummyjson.com/products/categories

## Technical requirements
### Rendering

- `/` — product listing, ISR with revalidate: `86400`
- `/products/[id]` — product detail, SSG via `generateStaticParams`
- `/search` — client-side only, TanStack Query
- `/vault` — client-side only, reads from localStorage

### Stack

Next.js 14+ with App Router
TypeScript throughout
TanStack Query for all client-side fetching
Chakra UI for all components
No custom backend — dummyjson only

### Code quality

Typed API responses with TypeScript interfaces
Reusable components: `ProductCard`, `SearchBar`, `VaultButton`
Loading and error states on every page
Responsive layout — mobile and desktop

## Out of scope (for now)

Authentication
Real backend or database
Pagination (can add later)
Unit tests (can add later)
