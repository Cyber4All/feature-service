import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { Injectable } from '@nestjs/common';
import { DefaultEmailParams } from './interfaces/mailer.defaults';
import * as MAIL_DEFAULTS from './interfaces/mailer.defaults';

enum SENDGRID_TEMPLATES {
    FEATURED_AUTHOR = 'd-f3a813a5262d4900b90b901c4628d612',
}

const MAILER_DEFAULTS = { 
    from:{ email:MAIL_DEFAULTS.FROM.NO_REPLY},
}
@Injectable()
export class SGService {
  private TEMPLATES = new Map<MAIL_DEFAULTS.TEMPLATES, string>()

  constructor(@InjectSendGrid() private readonly sgclient: SendGridService) {
      this.TEMPLATES.set(
          MAIL_DEFAULTS.TEMPLATES.FEATURED_AUTHOR, 
          SENDGRID_TEMPLATES.FEATURED_AUTHOR
      );
  }

  async sendFeaturedAuthorEmails(mailinfo: {
      name: string,
      username: string,
      email: string,
      cuid: string,
      objectName: string,
  }[]) { 
        for(let info of mailinfo){ 
            const mailDefauls: DefaultEmailParams = { 
                to: info.email,
                ...MAILER_DEFAULTS,
                subject: MAIL_DEFAULTS.SUBJECTS.FEATURED_AUTHOR,
                templateId: this.getTemplate(MAIL_DEFAULTS.TEMPLATES.FEATURED_AUTHOR),
                dynamic_template_data: { 
                    user: { 
                        firstName: info.name,
                        username: info.username,
                    },
                    object: { 
                        name: info.objectName,
                        cuid: info.cuid
                    }
                }
            }
            await this.sgclient.send(mailDefauls);
         } 
  }

  private getTemplate(template: MAIL_DEFAULTS.TEMPLATES): string {
    const id = this.TEMPLATES.get(template);
    if (id) {
      return id;
    }
    throw new Error(`No existing template for: ${template}`);
  }

}
