import type { Transporter } from "nodemailer";
import type { EmailService, SendMailOptions } from "../../domain";
import nodemailer from 'nodemailer';


export class NodeMailerService implements EmailService {
    private transporter: Transporter;

    constructor(
        mailerService: string,
        mailerEmail: string,
        mailerEmailPassword: string,
        private readonly postToProvider: boolean
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: mailerEmailPassword,
            }
        })
    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;
        try {
            if (!this.postToProvider) return true;
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });

            return true;
        } catch (error) {
            return false;
        }
    }

}