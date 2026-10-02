import express from "express";
import projectsRouter from "./modules/projects/projects.routes.js"
import tasksRouter from "./modules/tasks/tasks.routes.js"
import usersRouter from "./modules/users/users.routes.js" 
import projectMembersRouter from "./modules/project-members/project-members.routes.js"

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);
app.use("/api/projects/:projectId/members", projectMembersRouter);

app.listen(PORT, () => {
    console.log(`Lunvexa API is running on port ${PORT}`)
})