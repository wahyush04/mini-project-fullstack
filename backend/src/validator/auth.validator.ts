import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      rememberMe: Joi.boolean().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    next();
  } catch (err: any) {
    console.error("Login validation error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const registerValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      fullname: Joi.string().min(3).required(),
      username: Joi.string().alphanum().min(3).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().min(10).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    next();
  } catch (err: any) {
    console.error("Register validation error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};