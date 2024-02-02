import { Router } from "express";
import { UserParentService } from "./userTask.service.js";
import { UserParentController } from "./userTask.controller.js";

const router = Router();

const userParentService = new UserParentService();
const userParentController = new UserParentController(userParentService);

router.get("/", (req, res) => {
  userParentController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  userParentController.getById(req, res);
});

router.get("/task/:id", (req, res) => {
  userParentController.getByTaskId(req, res);
});

router.get("/user/:id", (req, res) => {
  userParentController.getByUserId(req, res);
});

router.post("/", (req, res) => {
  userParentController.create(req, res);

});

router.put("/:id", (req, res) => {
  userParentController.update(req, res);
});

router.delete("/:id", (req, res) => {
  userParentController.delete(req, res);
});

export default { router };
