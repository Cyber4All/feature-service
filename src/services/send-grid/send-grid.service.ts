import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { Injectable } from '@nestjs/common';
import { DefaultEmailParams } from './interfaces/mailer';

enum SENDGRID_TEMPLATES {
    FEATURED_AUTHOR = 'd-f3a813a5262d4900b90b901c4628d612',
}

const MAILER_DEFAULTS = { 
    from:{ email:`skaza@towson.edu`},
}
@Injectable()
export class SGService {
    
  constructor(@InjectSendGrid() private readonly sgclient: SendGridService) {}

  async sendFeaturedAuthorEmails(mailinfo: {
      name: string,
      username: string,
      email: string,
      cuid: string,
      objectName: string,
  }[]){ 
      try {
        for(let info of mailinfo){ 
            const mailDefauls: DefaultEmailParams = { 
                to: info.email,
                ...MAILER_DEFAULTS,
                subject: 'Congratulations You\ve been featured on Clark!!',
                templateId: SENDGRID_TEMPLATES.FEATURED_AUTHOR,
                templateVars: { 
                    user: { 
                        firstname: info.name,
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
      } catch (error) {
        console.log(error.response.body.errors)
      }
    
     
  }
}
