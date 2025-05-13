import express from "express";
import CourseRouter from "./course.route";
import UserRouter from "./user.route";
import LogRouter from "./log.route";
import AuthRouter from "./auth.route";
import ExamRouter from "./exam.route";
import TryoutSectionRouter from "./tryout.section.raoute";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/courses", CourseRouter);
router.use("/users", UserRouter);
router.use("/logs", LogRouter);
router.use("/exams", ExamRouter);
router.use("/tryout-sections", TryoutSectionRouter);

export default router;
