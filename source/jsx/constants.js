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
    recipients: ['node@radiatedpixel.com']
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
    recipients: ['gernot@raudner.at', 'some@dude.com']
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
        id: 1,
        recipients: ['gernot@raudner.at', 'some@dude.com']
      },
      { 
        author: {
          name: 'some author with a weirdly long name that also doesn\'t fit into the title view',
          email: 'somereallylongemailaddress@somelongerdomain.reallylong.example.com'
        }, 
        title: 'some title 3',
        content: 'lorem ipsum dolor sit amet. consetetur sadipecing elitr.',
        date: Date.now(),
        id: 0,
        unread: true,
        recipients: [
          'node@radiatedpixel.com', 
          'tom@radiatedpixel.com', 
          'evabrucker@aon.at',
          'someone@dudens.at',
          'john@doe.com',
          'somereallylongemailaddress@somelongerdomain.reallylong.example.com'
        ]
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
        id: 1,
        recipients: ['gernot@raudner.at', 'some@dude.com']
      }
    ]
  }
];
const SHOWN_RECIPIENTS = 3;
const Constants = { MAILS, EMPTY_AUTHOR, EMPTY_RECIPIENTS, EMPTY_TITLE, SHOWN_RECIPIENTS, ACCOUNTS, ROUTES };
export default Constants;