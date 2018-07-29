const EMPTY_AUTHOR = {
  name: 'Noone',
  email: 'no@one.com'
};
const EMPTY_RECIPIENTS = [
  'no@one.other.com'
];
const ROUTES = {
  accounts: '/settings/accounts'
};
const EMPTY_TITLE = 'some_empty_title_identifier';
const ACCOUNTS = [
  {
    id: 0,
    address: 'gernot.raudner@gmail.com',
    name: 'Gernot Raudner Gmail'
  }
];
const MAILS = [
  {
    author: {
      name: 'some author with a weirdly long name that also doesn\'t fit into the title view',
      email: 'somereallylongemailaddress@somelongerdomain.reallylong.example.com'
    },
    title: 'some title',
    content: 'lorem ipsum dolor sit amet. consetetur sadipecing elitr.',
    date: Date.now(),
    id: 0,
    unread: true,
    recipients: ['node@radiatedpixel.com'],
    folder: 'inbox',
    account: 'accounts'
  },
  {
    author: {
      name: 'noderich',
      email: 'noderich@gmail.com'
    },
    title: 'some longer title that doesn\'t fit into the title view',
    content: `At vero eos et accusam et justo duo dolores et ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                ipsum dolor sit amet.
                `,
    date: Date.now() - 60000,
    id: 1,
    recipients: ['gernot@raudner.at', 'some@dude.com'],
    folder: 'inbox',
    account: 'accounts'
  },
  {
    author: {
      name: 'noderino',
      email: 'noderino@nodensens.com'
    },
    title: 're: some title 3',
    content: `Lorem sönderzeichen %ß µ ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                sit amet.`,
    date: Date.now() - 60000*60,
    unread: true,
    id: 2,
    recipients: [
      'node@radiatedpixel.com',
      'tom@radiatedpixel.com',
      'evabrucker@aon.at',
      'someone@dudens.at',
      'john@doe.com',
      'somereallylongemailaddress@somelongerdomain.reallylong.example.com'
    ],
    folder: 'inbox',
    account: 'accounts',
    history: [
      {
        author: {
          name: 'noderich',
          email: 'noderich@gmail.com'
        },
        title: 're: some title 3',
        content: `At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                        `,
        date: Date.now() - 60000,
        id: 3,
        recipients: ['gernot@raudner.at', 'some@dude.com'],
        folder: 'inbox',
        account: 'accounts'
      },
      {
        author: {
          name: 'some author with a weirdly long name that also doesn\'t fit into the title view',
          email: 'somereallylongemailaddress@somelongerdomain.reallylong.example.com'
        },
        title: 'some title 3',
        content: 'lorem ipsum dolor sit amet. consetetur sadipecing elitr.',
        date: Date.now(),
        id: 4,
        unread: true,
        recipients: [
          'node@radiatedpixel.com',
          'tom@radiatedpixel.com',
          'evabrucker@aon.at',
          'someone@dudens.at',
          'john@doe.com',
          'somereallylongemailaddress@somelongerdomain.reallylong.example.com'
        ],
        folder: 'inbox',
        account: 'accounts'
      },
      {
        author: {
          name: 'noderich',
          email: 'noderich@gmail.com'
        },
        title: 'some longer title that doesn\'t fit into the title view',
        content: `At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, <b>htmltags</b><script>alert('nooo');</script>no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                        `,
        date: Date.now() - 60000,
        id: 5,
        recipients: ['gernot@raudner.at', 'some@dude.com'],
        folder: 'inbox',
        account: 'accounts'
      }
    ]
  }
];
const EXAMPLE_MAIL = {
  from: 'Yashwant Chavan <from@gmail.com>',
  to: 'gernraudn@gmail.com',
  subject: 'Send Email Using Node.js',
  text: 'Node.js New world for me',
  html: '<b>Node.js New world for me</b>'
};
const SHOWN_RECIPIENTS = 3;
const GMAIL_CLIENT_ID = '1046916899488-n263soq45qa6h1bpm888p1e742u5f7vc.apps.googleusercontent.com';
const GMAIL_CLIENT_KEY = 't61wrfulCOTDaMx2g5v9rM1v';
const AUTH_TYPE_GOOGLE = 'Google';
const AUTH_TYPE_IMAP = 'SMTP/IMAP';
const AUTH_TYPE_POP = 'SMTP/POP';
const AUTHENTICATION_TYPES = [
  AUTH_TYPE_GOOGLE,
  AUTH_TYPE_IMAP,
  AUTH_TYPE_POP
];
export const enum AuthType {
  Google,
  IMAP,
  POP
}
const Constants = {
  EXAMPLE_MAIL,
  MAILS,
  EMPTY_AUTHOR,
  EMPTY_RECIPIENTS,
  EMPTY_TITLE,
  SHOWN_RECIPIENTS,
  ACCOUNTS,
  ROUTES,
  AUTHENTICATION_TYPES,
  AUTH_TYPE_GOOGLE,
  AUTH_TYPE_IMAP,
  AUTH_TYPE_POP
};
export default Constants;
