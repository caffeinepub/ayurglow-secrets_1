import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import BlogPage from "./pages/BlogPage";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import SubcategoryPage from "./pages/SubcategoryPage";

function AppRoot() {
  return (
    <>
      <Outlet />
      <Toaster position="top-right" richColors />
    </>
  );
}

// Root layout
const rootRoute = createRootRoute({
  component: AppRoot,
});

// Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: PostPage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$slug",
  component: CategoryPage,
});

const subcategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$categorySlug/$subcategorySlug",
  component: SubcategoryPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  blogRoute,
  postRoute,
  categoryRoute,
  subcategoryRoute,
  adminRoute,
  aboutRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
