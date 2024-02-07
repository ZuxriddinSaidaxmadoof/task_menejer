import { Router } from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { AuthorizationMiddleware } from "../../middleware/middlewares.js"
const midlwares = new AuthorizationMiddleware();
const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.get("/", midlwares.checkToken, (req, res) => {
  userController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  userController.getById(req, res);
});

router.get("/company/:id", (req, res) => {
  userController.getByCompanyId(req, res);
});

router.post("/", (req, res) => {
  userController.register(req, res);
});

// router.post("/login", (req, res) => {
//   userController.loginUser(req, res);
// });

router.put("/:id", (req, res) => {
  userController.update(req, res);
});

router.delete("/:id", (req, res) => {
  userController.delete(req, res);
});

export default { router };
