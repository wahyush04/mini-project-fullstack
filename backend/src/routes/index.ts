import express from "express";
import CourseRouter from "./course.route";
import UserRouter from "./user.route";
import LogRouter from "./log.route";
import AuthRouter from "./auth.route";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/course", CourseRouter);
router.use("/users", UserRouter);
router.use("/logs", LogRouter);

export default router;
