import * as mailer from 'nodemailer';
import Constants from '@/constants';
import { NodemailAccount } from '@/typings';
function sendMail(account: Partial<NodemailAccount>) {
  let smtpTransport = mailer.createTransport({
    auth: {
      user: account.address,
      pass: account.password
    },
    host: account.smtpHost,
    port: account.smtpPort,
    secure: account.smtpSecure
  });
  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(Constants.EXAMPLE_MAIL, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
      smtpTransport.close();
    });
  });
}

export default sendMail;
