import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { Injectable } from '@nestjs/common';

enum SENDGRID_TEMPLATES {
    FEATURED_AUTHOR = '',
}

const MAILER_DEFAULTS = { 
    from: '',
}
@Injectable()
export class SGService {
    
  constructor(@InjectSendGrid() private readonly sgclient: SendGridService) {}

  async sendFeaturedAuthorEmails(authors: string[]){ 
     const mailDefauls = { 
         ...MAILER_DEFAULTS,
         to: authors,
         subject: '',
         templateType: SENDGRID_TEMPLATES.FEATURED_AUTHOR

     }
     await this.sgclient.send(mailDefauls);
  }
}
