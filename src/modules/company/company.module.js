import { Router } from "express";
import { CompanyController } from "./company.controller.js";
import { CompanyService } from "./company.service.js";

const router = Router();

const companyService = new CompanyService();
const companyController = new CompanyController(companyService);

router.get("/", (req, res) => {
  companyController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  companyController.getById(req, res);
});

router.post("/", (req, res) => {
  companyController.create(req, res);
});

router.put("/:id", (req, res) => {
  companyController.update(req, res);
});

router.delete("/:id", (req, res) => {
  companyController.delete(req, res);
});

export default { router };
