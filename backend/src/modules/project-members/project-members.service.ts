import { members } from "./project-members.data.js";

type CreateProjectMemberData = {
    userId: number;
    role: "Owner" | "Admin" | "User";
}

type UpdateProjectMemberData = {
  role?: "Owner" | "Admin" | "User";
};

export const getProjectMembers = (projectId: number) => {
    const projectMembers = members.filter((member) => member.projectId === projectId)
    return projectMembers;
};

export const getProjectMemberById = (projectId: number, memberId: number) => {
    const projectMember = members.find((member) => member.projectId === projectId && member.id === memberId)
    return projectMember;
};

export const getProjectMemberByUserId = (projectId: number, userId: number) => {
    const projectMemberByUser = members.find((member) => member.projectId === projectId && member.userId === userId);
    return projectMemberByUser;
}

export const createProjectMember = (projectId: number, data: CreateProjectMemberData,) => {
    const ids = members.map((member) => member.id);
    const newId = Math.max(...ids) + 1;

    const newMember = {
        id: newId,
        userId: data.userId,
        projectId: projectId,
        role: data.role,
    };

    members.push(newMember);
    return newMember;
};

export const updateProjectMember = (projectId: number, memberId: number, data: UpdateProjectMemberData,) => {
    const updatingMember = getProjectMemberById(projectId, memberId);
    if(!updatingMember){
        return;
    };
    if (data.role !== undefined){
        updatingMember.role = data.role;
    };
    return updatingMember;
};

export const deleteProjectMember = (projectId: number, memberId: number) => {
    const deletingMember = getProjectMemberById(projectId, memberId);
    if(!deletingMember){
        return;
    };
    const memberIndex = members.findIndex((member) => member.id === memberId);
    const deletedMember = members.splice(memberIndex, 1);
    return deletedMember[0];
};