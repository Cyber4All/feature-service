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
    name: string;
    levels: string;
    version: number;
    status: string;
};