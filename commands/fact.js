const { reply } = require('../utils/ninjaStyle');

const FACTS = [
    "Le vrai Spinjitzu ne peut être maîtrisé qu'après avoir trouvé son propre équilibre intérieur.",
    "Un ninja peut retenir sa respiration bien plus longtemps grâce à la méditation quotidienne.",
    "Le dojo le plus ancien du monde a plus de mille ans d'histoire silencieuse.",
    "Les dragons élémentaires ne répondent qu'à ceux qui ont un cœur pur.",
    "Le bambou est l'une des plantes à la croissance la plus rapide au monde : jusqu'à 1 mètre par jour.",
    "Le mot 'ninja' vient du japonais 'nin' (endurance) et 'sha' (personne).",
    "Un vrai maître ne compte jamais ses victoires, seulement ses leçons.",
    "Le silence est, pour un ninja, une arme aussi puissante que n'importe quelle lame."
];

module.exports = {
    name: 'fact',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;
        const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
        await sock.sendCustom(from, { text: reply("🎭 𝗞𝗜𝗭𝗨𝗠𝗜 • 𝗙𝗨𝗡", [fact]) });
    }
};
