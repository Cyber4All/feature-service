export enum FROM {
    NO_REPLY = 'CLARK <noreply@secured.team>'
}
export enum SUBJECTS {
    FEATURED_AUTHOR = 'Congratulations!! You have been featured on Clark',
}

export enum TEMPLATES {
    FEATURED_AUTHOR = 'featured author',
}

export const TEMPLATE_VARIABLES = new Map<
    TEMPLATES,
    { [index: string]: any }
>();

TEMPLATE_VARIABLES.set(TEMPLATES.FEATURED_AUTHOR, {
    user: {
        firstname: '',
        username: '',
    },
    object: {
        name: '',
        cuid: ''
    }
});

export type MailTemplate = {
    name: string;
    templateVariables: { [index: string]: any};
}

export const SYSTEM_ONLY_TEMPLATES = [
    TEMPLATES.FEATURED_AUTHOR,
];

export interface DefaultEmailParams { 
    to: string | string[],
    from: {email: string},
    subject: string,
    templateId: string,
    dynamic_template_data: {},
    text?: string,
    html?: string,
    cc?: string | string[],
    bcc?: string | string[],
    replyTo?: string,
    headers?: {}
}