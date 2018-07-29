import { gmail_v1 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import secret from '../../google-client-secret.json';
import { readFile, mkdirSync, writeFile} from 'fs';
import { Credentials } from '../../../node_modules/google-auth-library/build/src/auth/credentials';
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';

const TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-token.json';

let oauth2Client = createOauthClient();

function createOauthClient() {
  const {client_secret, client_id, redirect_uris} = secret.installed;
  const redirectUrl = redirect_uris[0];
  return new OAuth2Client(client_id, client_secret, redirectUrl);
}

function readToken() {
  return new Promise((resolve, reject) => {
    readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token.toJSON());
      }
    });
  });
}

export function getNewTokenUrl() {
  oauth2Client = createOauthClient();
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  return authUrl;
}

export function authenticateWithCode(code: string) {
  return new Promise((resolve, reject) => {
    oauth2Client.getToken(code, (err, token) => {
      if (err || !token) {
        reject(`Error while trying to retrieve access token: ${err ? err.message : 'no token received!'}`);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      resolve();
    });
  });
}

function storeToken(token: Credentials) {
  try {
    mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  writeFile(TOKEN_PATH, JSON.stringify(token), err => console.warn(`Error while storing access token: ${err.message}`));
}

export function listLabels(auth: OAuth2Client) {
  const gmail = new gmail_v1.Gmail({});
  gmail.users.labels.list({
    auth,
    userId: 'me'
  }, (err, response) => {
    if (err || !response) {
      console.log('The API returned an error: ' + err);
      return;
    }
    const labels = response.data.labels || [];
    if (!labels.length) {
      console.log('No labels found.');
    } else {
      console.log('Labels:');
      labels.forEach(label => console.log('- %s', label.name));
    }
  });
}

export function authenticate() {
  return readToken()
  .then((token: Credentials) => {
    oauth2Client.credentials = token;
  }).then(() => listLabels(oauth2Client));
}

