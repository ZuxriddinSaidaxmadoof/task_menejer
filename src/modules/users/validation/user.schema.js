import Joi from "joi";
import { roles } from "../../../common/enums/roles.js";

const rolesArray = Object.values(roles);

export const userRegisterSchema = Joi.object({
  login: Joi.string().max(32).min(4).required(),
  password: Joi.string().max(32).min(4).required(),
  fullName: Joi.string().required(),
  companyId: Joi.number(),
  role: Joi.string()
    .valid(...rolesArray)
  });

