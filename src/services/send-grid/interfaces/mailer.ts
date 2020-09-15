export interface DefaultEmailParams { 
    to: string | string[],
    from: string,
    subject: string,
    template: string,
    templateVars: {},
    text?: string,
    html?: string,
    cc?: string | string[],
    bcc?: string | string[],
    replyTo?: string,
    headers?: {}
}