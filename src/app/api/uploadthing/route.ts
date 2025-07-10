import { createRouteHandler } from "uploadthing/next"; // <-- Diubah di sini
import { ourFileRouter } from "./core";

// Ekspor route handler
export const { GET, POST } = createRouteHandler({
  // <-- Dan diubah di sini
  router: ourFileRouter,
});
