const { readConfig, writeConfig } = require('../utils/sessionConfig');
const { reply } = require('../utils/ninjaStyle');

module.exports = {
    name: 'goodbye',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;
        if (!from.endsWith('@g.us')) {
            return sock.sendCustom(from, { text: reply("⚠️ 𝗘𝗥𝗥𝗘𝗨𝗥", ["Cette commande est réservée aux groupes."]) });
        }

        const config = readConfig(sock);
        config.goodbye = config.goodbye || {};

        if (args[0] === 'on') {
            config.goodbye[from] = true;
            writeConfig(sock, config);
            sock.sendCustom(from, { text: reply("👋 𝗚𝗢𝗢𝗗𝗕𝗬𝗘", ["Activé ✅ pour ce groupe."]) });

        } else if (args[0] === 'off') {
            config.goodbye[from] = false;
            writeConfig(sock, config);
            sock.sendCustom(from, { text: reply("👋 𝗚𝗢𝗢𝗗𝗕𝗬𝗘", ["Désactivé ❌ pour ce groupe."]) });

        } else {
            sock.sendCustom(from, { text: reply("📌 𝗨𝗧𝗜𝗟𝗜𝗦𝗔𝗧𝗜𝗢𝗡", [".goodbye on", ".goodbye off"]) });
        }
    }
};
