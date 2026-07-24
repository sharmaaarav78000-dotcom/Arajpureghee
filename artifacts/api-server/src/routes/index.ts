import { Router, type IRouter } from "express";
import healthRouter from "./health";
import gheeChatRouter from "./gheeChat";

const router: IRouter = Router();

router.use(healthRouter);
router.use(gheeChatRouter);

export default router;
