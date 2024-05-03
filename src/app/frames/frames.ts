import { createFrames } from "frames.js/next";
import { imagesWorkerMiddleware } from "frames.js/middleware/images-worker";
import { farcasterHubContext } from "frames.js/middleware";

const { IMAGE_WORKER_SECRET, HUB_HTTP_URL } = process.env;


export const frames = createFrames({
  basePath: "/frames",
  middleware: [
    imagesWorkerMiddleware({
      imagesRoute: "/images",
      secret: IMAGE_WORKER_SECRET,
    }),
    farcasterHubContext({
      hubHttpUrl: HUB_HTTP_URL,
    }),
  ],
});