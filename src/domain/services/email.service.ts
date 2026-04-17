export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}


export abstract class EmailService {

    abstract sendEmail(options: SendMailOptions): Promise<boolean>
}

