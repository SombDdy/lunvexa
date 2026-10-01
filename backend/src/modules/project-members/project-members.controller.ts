import { getProjectMembers, getProjectMemberById, createProjectMember, updateProjectMember, deleteProjectMember, getProjectMemberByUserId } from "./project-members.service.js";
import type { Request, Response } from "express";
import { getUserById} from "../users/users.service.js";
import { getProjectById } from "../projects/projects.service.js";

export const getProjectMembersController = (request: Request, response: Response) => {
    const projectId = Number(request.params.projectId);
    if(!Number.isInteger(projectId) || projectId <= 0){
        return response.status(400).json({message: "Invalid project id"})
    }
    const members = getProjectMembers(projectId);
    return response.json(members);
}

export const getProjectMemberController = (request: Request, response: Response) => {
    const projectId = Number(request.params.projectId);
    const memberId = Number(request.params.memberId);
    if(!Number.isInteger(projectId) || projectId <= 0){
        return response.status(400).json({message: "Invalid project id"});
    };
    if(!Number.isInteger(memberId) || memberId <= 0){
        return response.status(400).json({message: "Invalid member id"});
    };
    const projectMember = getProjectMemberById(projectId, memberId);
    if(!projectMember){
        return response.status(404).json({message: "Member not found"});
    };
    return response.json(projectMember);
}

export const postProjectMemberController = (request: Request, response: Response) => {
    const projectId = Number(request.params.projectId);
    const data = request.body;
    if(!Number.isInteger(projectId) || projectId <= 0){
        return response.status(400).json({message: "Invalid project id"});
    };

    const project = getProjectById(projectId);
    if(!project){
        return response.status(404).json({message: "Project not found"})
    }

    if (typeof data.userId !== "number" || data.userId <=0 || !Number.isInteger(data.userId)){
        return response.status(400).json({message: "Invalid user id"});
    };
    const user = getUserById(data.userId);
    if(!user){
        return response.status(404).json({message: "User not found"});
    }

    if(typeof data.role !== "string" || !["Owner", "Admin", "User"].includes(data.role)){
        return response.status(400).json({message: "Invalid role"});
    };

    const existingMember = getProjectMemberByUserId(projectId, data.userId);
    if(existingMember){
        return response.status(409).json({message: "User is already a project member"})
    }
    const newMember = createProjectMember(projectId, data);
    return response.status(201).json(newMember);
}

export const patchProjectMemberController = (request: Request, response: Response) => {
    const projectId = Number(request.params.projectId);
    const memberId = Number(request.params.memberId);
    const data = request.body;
    if(!Number.isInteger(projectId) || projectId <= 0){
        return response.status(400).json({message: "Invalid project id"});
    };
    if(!Number.isInteger(memberId) || memberId <= 0){
        return response.status(400).json({message: "Invalid member id"});
    };
    if(data.role !== undefined && (typeof data.role !== "string" || !["Owner", "Admin", "User"].includes(data.role))){
        return response.status(400).json({message: "Invalid role"});
    };
    const updatedProjectMember = updateProjectMember(projectId, memberId, data);
    if(!updatedProjectMember){
        return response.status(404).json({message: "Project Member not found"});
    };
    return response.status(200).json(updatedProjectMember)
}

export const deleteProjectMemberController = (request: Request, response: Response) => {
    const projectId = Number(request.params.projectId);
    const memberId = Number(request.params.memberId);
    if(!Number.isInteger(projectId) || projectId <= 0){
        return response.status(400).json({message: "Invalid project id"});
    };
    if(!Number.isInteger(memberId) || memberId <= 0){
        return response.status(400).json({message: "Invalid member id"});
    };
    const deletedProjectMember = deleteProjectMember(projectId, memberId);
    if(!deletedProjectMember){
        return response.status(404).json({message: "Project Member not found"});
    };
    return response.status(200).json(deletedProjectMember);
}