# Xclusive — E-Commerce Vue 3 App

A fully featured e-commerce storefront built with Vue 3, Pinia, TypeScript, and SCSS. Products are sourced from the [DummyJSON API](https://dummyjson.com).

---

## Tech Stack

| Layer            | Technology                                |
| ---------------- | ----------------------------------------- |
| Framework        | Vue 3 (Composition API, `<script setup>`) |
| State Management | Pinia                                     |
| Routing          | Vue Router 4                              |
| HTTP Client      | Axios                                     |
| Styling          | SCSS (7-1 Architecture)                   |
| Language         | TypeScript                                |
| Testing          | Jest + Vue Test Utils v2                  |
| Notifications    | Vue Toastification                        |

---

## Project Structure

```
src/
├── assets/styles/        # SCSS 7-1 architecture
│   ├── abstracts/        # Variables and mixins
│   ├── base/             # Reset and typography
│   ├── components/       # Per-component styles
│   ├── layout/           # Header, footer, layout styles
│   └── pages/            # Page-level styles
│
├── composables/          # Reusable logic (useSearch, useFetchProducts, etc.)
│
├── modules/              # Feature-based modules
│   ├── cart/             # Cart components and Pinia store
│   ├── home/             # Homepage view and components
│   ├── products/         # Products/detail views, components, store
│   └── shared/           # Global components, layouts, views, utils
│
├── router/               # Vue Router configuration
├── services/             # Axios HTTP client and API service functions
└── types/                # TypeScript interfaces and types
```

---

## Architecture Overview

### State Management (Pinia)

Two stores handle all application state:

- **`useCartStore`** — cart items, quantities, localStorage persistence, and panel visibility
- **`useProductsStore`** — product listings, home/flash-sale products, search results, selected product

### Composables

Business logic is extracted into composables for reuse and testability:

- `useSearch` — debounced header search with route-aware clearing
- `useFetchProducts` — paginated product fetching with loading/error states
- `useFetchHomeProducts` / `useFetchFlashsaleProducts` — homepage data fetching
- `useProductsSorting` — client-side sort logic for the products page
- `useWindowResize` — resize event listener with automatic cleanup

### Routing

Nested route structure with two layouts:

- `DefaultLayout` — main layout with header/footer (all main pages)
- `EmptyLayout` — minimal layout for the 404 page

### API Layer

All API calls go through a single Axios instance in `services/http.ts` with centralized error logging. Service functions in `services/product.service.ts` wrap each endpoint and return typed data.

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run serve
```

### Run tests

```bash
npm run test:unit
```

### Run tests with coverage

```bash
npm run test:unit -- --coverage
```

### Build for production

```bash
npm run build
```

---

## Key Features

- Browse products with category filtering and multi-criteria sorting
- Product detail page with related products and URL slug validation
- Persistent shopping cart with localStorage
- Debounced live search with dropdown results
- Responsive design across all screen sizes
- Hero image carousel with auto-slide
- Contact form with client-side validation
- 404 handling with automatic redirect

---

## Testing

Tests are written with Jest and Vue Test Utils v2. Coverage is collected across all cart components, shared UI components, the cart store, and router.

```bash
npm run test:unit          # run all tests
npm run test:unit -- --coverage   # with coverage report
```

Test files live in `tests/unit/` organized by type:

- `components/` — component rendering and interaction tests
- `store/` — Pinia store action and state tests
- `router/` — route navigation tests
