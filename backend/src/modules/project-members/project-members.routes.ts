import { Router, } from "express";
import { getProjectMembersController, getProjectMemberController, postProjectMemberController, patchProjectMemberController, deleteProjectMemberController } from "./project-members.controller.js";


const router = Router({mergeParams: true});

router.get("/", getProjectMembersController);
router.get("/:memberId", getProjectMemberController);
router.post("/", postProjectMemberController);
router.patch("/:memberId", patchProjectMemberController);
router.delete("/:memberId", deleteProjectMemberController);

export default router;