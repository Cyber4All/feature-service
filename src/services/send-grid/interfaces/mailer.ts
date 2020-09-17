export interface DefaultEmailParams { 
    to: string | string[],
    from: {email: string},
    subject: string,
    templateId: string,
    templateVars: {},
    text?: string,
    html?: string,
    cc?: string | string[],
    bcc?: string | string[],
    replyTo?: string,
    headers?: {}
}