export interface User {
    id: string;
    username: string;
    email: string;
    notificationsEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class UserModel {
    constructor(public user: User) {}

    static fromJson(json: any): UserModel {
        return new UserModel({
            id: json.id,
            username: json.username,
            email: json.email,
            notificationsEnabled: json.notificationsEnabled,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        });
    }

    toJson(): any {
        return {
            id: this.user.id,
            username: this.user.username,
            email: this.user.email,
            notificationsEnabled: this.user.notificationsEnabled,
            createdAt: this.user.createdAt.toISOString(),
            updatedAt: this.user.updatedAt.toISOString(),
        };
    }
}