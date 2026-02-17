import { Router } from "express";
import urlRoutes from "./url.routes";
import healthRoutes from "./health.routes"

const router = Router();

router.use("/health", healthRoutes);
router.use("/", urlRoutes);


export default router;
