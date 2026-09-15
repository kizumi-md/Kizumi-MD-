const { readConfig, writeConfig } = require('../utils/sessionConfig');
const { reply } = require('../utils/ninjaStyle');

module.exports = {
    name: 'antifake',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;
        if (!from.endsWith('@g.us')) {
            return sock.sendCustom(from, { text: reply("⚠️ 𝗘𝗥𝗥𝗘𝗨𝗥", ["Cette commande est réservée aux groupes."]) });
        }

        const config = readConfig(sock);
        if (!config.antifake) config.antifake = {};

        const action = args[0] ? args[0].toLowerCase() : '';

        if (action === 'on') {
            config.antifake[from] = true;
            writeConfig(sock, config);
            sock.sendCustom(from, { text: reply("🛡️ 𝗔𝗡𝗧𝗜-𝗙𝗔𝗞𝗘", ["Activé ✅ pour ce groupe."]) });

        } else if (action === 'off') {
            config.antifake[from] = false;
            writeConfig(sock, config);
            sock.sendCustom(from, { text: reply("🛡️ 𝗔𝗡𝗧𝗜-𝗙𝗔𝗞𝗘", ["Désactivé ❌ pour ce groupe."]) });

        } else {
            sock.sendCustom(from, { text: reply("📌 𝗨𝗧𝗜𝗟𝗜𝗦𝗔𝗧𝗜𝗢𝗡", [".antifake on", ".antifake off"]) });
        }
    }
};
