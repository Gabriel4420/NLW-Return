import { MailAdapter, SendMailData } from '../mail-adapter'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '52ebd55ca54485',
    pass: '4176c4c368fb49',
  },
})

export class NodemailerAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    transport.sendMail({
      from: 'Equipe FeedGet <Oi@feedget.com>',
      to: 'Gabriel Rodrigues <gabriel_rodrigues_perez@hotmail.com>',
      subject,
      html: body,
    })
  }
}
