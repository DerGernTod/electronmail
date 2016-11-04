const MAILS = [
            { 
                author: {
                    name: "some author with a weirdly long name that also doesn't fit into the title view",
                    email: 'somereallylongemailaddress@somelongerdomain.reallylong.example.com'
                }, 
                title: "some title",
                content: "lorem ipsum dolor sit amet. consetetur sadipecing elitr.",
                date: Date.now(),
                id: 0,
                unread: true,
                recipients: ['node@radiatedpixel.com']
            },
            { 
                author: {
                    name: "noderich",
                    email: 'noderich@gmail.com'
                }, 
                title: "some longer title that doesn't fit into the title view",
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
                    name: "noderino",
                    email: 'noderino@nodensens.com'
                }, 
                title: "some title 3",
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
                ]
            }
        ];
const Constants = { MAILS : MAILS};
export default Constants;