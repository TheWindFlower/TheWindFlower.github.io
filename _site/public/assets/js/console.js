export function drawConsole() {
    const ASCII = `
 ██████╗ ███████╗██╗   ██╗
 ██╔══██╗██╔════╝██║   ██║
 ██║  ██║█████╗  ██║   ██║
 ██║  ██║██╔══╝  ╚██╗ ██╔╝
 ██████╔╝███████╗ ╚████╔╝ 
 ╚═════╝ ╚══════╝  ╚═══╝  `;

    const S = (color) => `color: ${color}; font-family: monospace;`;
    const GREEN = S("#00ff88");
    const CYAN = S("#00e5ff");
    const YELLOW = S("#ffd600");
    const DIM = S("#666");
    const RESET = S("#e0e0e0");

    const messages = {
        en: {
            greeting: "you opened DevTools. curious. i like that.",
            welcome: "welcome to the backend of my portfolio.",
            commands: "available commands",
            secret: "you found the easter egg.\nmost people never look here.\nyou're not most people.",
            cookie: "here's a cookie: 🍪",
        },
        fr: {
            greeting: "tu as ouvert les DevTools. curieux. j'aime ça.",
            welcome: "bienvenue dans les coulisses de mon portfolio.",
            commands: "commandes disponibles",
            secret: "tu as trouvé l'easter egg.\nla plupart des gens ne regardent jamais ici.\ntoi, si.",
            cookie: "voici un cookie : 🍪",
        },
    };
    let lang = document.documentElement.lang;
    console.log("%c" + ASCII, GREEN);
    console.log("%c" + messages[lang].greeting, DIM);
    console.log("%c" + messages[lang].welcome, RESET);
    console.log(" ");
    console.log("%c" + messages[lang].commands + "%c {", CYAN, DIM);
    console.log("%c  hello()   %c→ about me", YELLOW, DIM);
    console.log("%c  stack()   %c→ tech stack", YELLOW, DIM);
    console.log("%c  hire()    %c→ open to work", YELLOW, DIM);
    console.log("%c  secret()  %c→ ...", YELLOW, DIM);
    console.log("%c}", DIM);

    window.hello = () => {
        console.log("%cname     → Camille Petrou", GREEN);
        console.log("%crole     → full-stack developer/cybersecurity", GREEN);
        console.log("%clocation → Quebec, QC", GREEN);
        console.log("%cgithub   → github.com/TheWindFlower", CYAN);
    };

    window.stack = () => {
        console.log("%cfrontend%c  React · TypeScript · Tailwind", CYAN, RESET);
        console.log("%cbackend%c   Node.js · Python · PostgreSQL", CYAN, RESET);
        console.log("%cinfra%c     Docker · Vercel · AWS", CYAN, RESET);
    };

    window.hire = () => {
        console.log("%c[ AVAILABLE FOR WORK ]", GREEN);
        console.log("%copen to: freelance / full-time / contracts", RESET);
        console.log("%c→ camille.petrou@gmail.com", CYAN);
    };

    window.secret = () => {
        console.log(
            "%cACCESS GRANTED",
            "color: #ff5f57; font-size: 18px; font-weight: bold;",
        );
        console.log(
            "%cyou found the easter egg.\nmost people never look here.\nyou're not most people.",
            DIM,
        );
        console.log("%chere's a cookie: 🍪", YELLOW);
        console.log("%cnow close DevTools and go look at my projects.", DIM);
    };
}
