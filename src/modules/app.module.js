import { Router } from "express";
import company from "./company/company.module.js";
import users from "./users/user.module.js";
import tasks from "./tasks/tasks.module.js";
import user_task from "./user_tasks/userTask.module.js";


const router = Router();

router.use("/company", company.router);
router.use("/users", users.router);
router.use("/tasks", tasks.router);
router.use("/user-tasks", user_task.router);



export default { router };
