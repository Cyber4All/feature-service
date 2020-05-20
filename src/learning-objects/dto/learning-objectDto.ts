export class LearningObjectDto {
    id: string;
    author: {
        name: string,
        username: string,
        email: string,
        organization: string,
    };
    date: string;
    collection: string;
    contributors: [string];
    description: string;
    cuid?: string;
    length: string;
    levels: [string];
    name: string;
    version: number;
    status: string;
};