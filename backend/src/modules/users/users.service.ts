import { users } from "./users.data.js";

export type CreateUserData = {
    name: string;
    email: string;
    avatarUrl?: string;
 }

 export type UpdateUserData = {
    name?: string;
    email?: string;
    avatarUrl?: string;
 }

export const getAllUsers = () => {
    return users;
}

export const getUserById = (id: number) => {
    const exactUser = users.find((user) => user.id === id);
    return exactUser;
}

export const createUser = (data: CreateUserData) => {
    const ids = users.map((user) => user.id);
    const newId = Math.max(...ids) + 1;

    const newUser = {
        id: newId,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
    };

    users.push(newUser);
    return newUser;
}

export const updateUser = (id: number, data: UpdateUserData) => {
    const updatingUser = getUserById(id);
    if(!updatingUser){
        return;
    };
    if(data.name !== undefined){
        updatingUser.name = data.name;
    };
    if(data.email !== undefined){
        updatingUser.email = data.email;
    };
    if(data.avatarUrl !== undefined){
        updatingUser.avatarUrl = data.avatarUrl;
    }
    return updatingUser;
}

export const deleteUser = (id: number) => {
    const deletingUser = getUserById(id);
    if(!deletingUser){
        return;
    };
    const userIndex = users.findIndex((user) => user.id === id);
    const deletedUser = users.splice(userIndex, 1);
    return deletedUser[0];
}