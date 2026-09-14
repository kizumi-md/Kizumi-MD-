const { reply } = require('../utils/ninjaStyle');

const JOKES = [
    "Pourquoi les ninjas ne jouent-ils jamais aux cartes dans la jungle ? Trop de guépards.",
    "Qu'est-ce qu'un ninja dit à un autre ninja invisible ? Rien, il ne le voit pas.",
    "Pourquoi le dragon a-t-il raté son examen ? Il a soufflé toutes ses réponses.",
    "Comment un ninja range-t-il sa chambre ? Il la fait disparaître en un éclair.",
    "Pourquoi Lloyd n'utilise jamais d'ascenseur ? Il préfère le Spinjitzu.",
    "Un ninja entre dans un bar... personne ne l'a vu entrer.",
    "Pourquoi les maîtres du dojo n'ont jamais froid ? Leur aura chauffe toute la pièce.",
    "Poukisa Kizumi se Best Bot ? Paske Kizumi renmen gwo bouboun👅."
];

module.exports = {
    name: 'joke',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;
        const joke = JOKES[Math.floor(Math.random() * JOKES.length)];
        await sock.sendCustom(from, { text: reply("🎭 𝗞𝗜𝗭𝗨𝗠𝗜 • 𝗙𝗨𝗡", [joke]) });
    }
};
