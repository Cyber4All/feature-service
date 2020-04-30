
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

    //helper function
    static newLearningObjectDto(document: any):LearningObjectDto {
        const dto = new LearningObjectDto()
        dto.id = document['id'],
        dto.author = document['author'],
        dto.author.name = document['author']['name'],
        dto.author.username = document['author']['username'],
        dto.author.email = document['author']['email'],
        dto.author.organization = document['author']['organization'],
        dto.collections = document['collection'],
        dto.contributors = document['contributors'],
        dto.description = document['description'],
        dto.cuid = document['cuid'],
        dto.length = document['length'],
        dto.name = document['name'],
        dto.levels = document['levels'],
        dto.outcomes = document['outcomes'];
        dto.version = document['version'];
        dto.status = document['status'];

        return dto;
    }
};