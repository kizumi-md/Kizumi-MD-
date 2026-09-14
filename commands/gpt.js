const { askAI } = require('../utils/aiClient');
const { reply } = require('../utils/ninjaStyle');

module.exports = {
    name: 'gpt',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;
        const question = args.join(' ');

        if (!question) {
            return sock.sendCustom(from, { text: reply("🧠 𝗞𝗜𝗭𝗨𝗠𝗜 • 𝗔𝗜", ["Écris ton message.", "Exemple : .gpt Bonjour !"]) });
        }

        try {
            const answer = await askAI(question);
            await sock.sendCustom(from, { text: reply("🧠 𝗞𝗜𝗭𝗨𝗠𝗜 • 𝗔𝗜", [answer]) });
        } catch (e) {
            if (e.code === "NEEDS_CONFIG") {
                return sock.sendCustom(from, {
                    text: reply("⚙️ 𝗖𝗢𝗡𝗙𝗜𝗚 𝗥𝗘𝗤𝗨𝗜𝗦𝗘", ["Ajoute AI_API_KEY dans env/.env pour activer .gpt."])
                });
            }
            await sock.sendCustom(from, { text: reply("❌ 𝗘𝗥𝗥𝗘𝗨𝗥", ["Le service IA est indisponible, réessaie plus tard."]) });
        }
    }
};
