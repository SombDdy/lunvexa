import { Router } from "express";
import { deleteUserController, getUserController, getUsersController, patchUserController, postUserController } from "./users.controller.js";

const router = Router();

router.get("/", getUsersController);
router.get("/:id", getUserController);
router.post("/", postUserController);
router.patch("/:id", patchUserController);
router.delete("/:id", deleteUserController);


export default router;