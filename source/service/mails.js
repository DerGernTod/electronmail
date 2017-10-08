import mailer from 'nodemailer';
import Constants from '../constants';
function sendMail(account) {
  let smtpTransport = mailer.createTransport({
    auth: {
      user: account.address,
      pass: account.password
    },
    host: account.host,
    port: account.port,
    secure: account.secure
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