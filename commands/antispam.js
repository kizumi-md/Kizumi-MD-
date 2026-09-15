const { readConfig, writeConfig } = require('../utils/sessionConfig');
const { reply } = require('../utils/ninjaStyle');

module.exports = {
    name: 'antispam',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;
        if (!from.endsWith('@g.us')) {
            return sock.sendCustom(from, { text: reply("⚠️ 𝗘𝗥𝗥𝗘𝗨𝗥", ["Cette commande est réservée aux groupes."]) });
        }

        const config = readConfig(sock);
        if (!config.antispam) config.antispam = {};

        const action = args[0] ? args[0].toLowerCase() : '';

        if (action === 'on') {
            config.antispam[from] = true;
            writeConfig(sock, config);
            sock.sendCustom(from, { text: reply("🛡️ 𝗔𝗡𝗧𝗜-𝗦𝗣𝗔𝗠", ["Activé ✅ pour ce groupe."]) });

        } else if (action === 'off') {
            config.antispam[from] = false;
            writeConfig(sock, config);
            sock.sendCustom(from, { text: reply("🛡️ 𝗔𝗡𝗧𝗜-𝗦𝗣𝗔𝗠", ["Désactivé ❌ pour ce groupe."]) });

        } else {
            sock.sendCustom(from, { text: reply("📌 𝗨𝗧𝗜𝗟𝗜𝗦𝗔𝗧𝗜𝗢𝗡", [".antispam on", ".antispam off"]) });
        }
    }
};
