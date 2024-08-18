import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// تحديد المسارات العامة
const isPublicRoute = createRouteMatcher([
  "/",
  "/question/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs",
]);

// تحديد المسارات التي يجب تجاهلها
const isIgnoredRoute = createRouteMatcher(["/api/webhook", "/api/chatgpt"]);

export default clerkMiddleware((auth, req) => {
  // إذا كان المسار من المسارات التي يجب تجاهلها، لا تطبق الحماية
  if (isIgnoredRoute(req)) return;

  // إذا لم يكن المسار عامًا، نطبق التحقق
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
