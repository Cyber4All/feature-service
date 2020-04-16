
export class LearningObjectDto {
    id: string;
    author: {
        name: string,
        username: string,
        email: string,
        organization: string,
    };
    collections: string;
    contributors: [string];
    description: string;
    cuid?: string;
    length: string;
    name: string;
    levels: string;
    outcomes: [string];
    version: number;
    status: string;
};