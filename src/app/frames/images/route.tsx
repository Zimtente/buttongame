import { createImagesWorker } from "frames.js/middleware/images-worker/next";

const {IMAGE_WORKER_SECRET} = process.env;

const imagesRoute = createImagesWorker({
    secret: IMAGE_WORKER_SECRET,
});

export const GET = imagesRoute();