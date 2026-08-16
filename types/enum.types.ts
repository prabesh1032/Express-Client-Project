export enum Role{
        ADMIN="ADMIN",
        USER="USER",
        SUPER_ADMIN="SUPER_ADMIN",
}
export const userOnly=[Role.USER];
export const admins =[Role.ADMIN, Role.SUPER_ADMIN];