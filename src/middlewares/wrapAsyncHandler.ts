import { Router } from "express";
import { asyncHandler } from "./asyncHandler";

/**
 * Wraps all asynchronous routes of an `Express` router with the `asyncHandler` middleware.
 * This ensures that any errors in asynchronous routes are automatically passed to the next middleware.
 * 
 * @param {Router} router - The Express router whose routes need to be wrapped with `asyncHandler`.
 * @returns {Router} The router with all asynchronous routes wrapped in `asyncHandler`.
 * 
 * @example
 * const companyRouter = new CompanyRouter().getRouter();
 * app.use('/company', wrapAsyncRoutes(companyRouter));
 * 
 * // Now all routes within `companyRouter` will automatically handle asynchronous errors.
 */
export const wrapAsyncRoutes = (router: Router): Router => {
  const routes = router.stack;

  routes.forEach((layer: any) => {
    if (layer.route) {
      layer.route.stack.forEach((routeLayer: any) => {
        const originalHandler = routeLayer.handle;
        routeLayer.handle = asyncHandler(originalHandler);
      });
    }
  });

  return router;
};
