const { readConfig, writeConfig } = require('../utils/sessionConfig');
const { reply } = require('../utils/ninjaStyle');

module.exports = {
    name: 'antiadd',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;
        if (!from.endsWith('@g.us')) {
            return sock.sendCustom(from, { text: reply("⚠️ 𝗘𝗥𝗥𝗘𝗨𝗥", ["Cette commande est réservée aux groupes."]) });
        }

        const config = readConfig(sock);
        if (!config.antiadd) config.antiadd = {};

        const action = args[0] ? args[0].toLowerCase() : '';

        if (action === 'on') {
            config.antiadd[from] = true;
            writeConfig(sock, config);
            // API native WhatsApp : seuls les admins peuvent ajouter des membres
            try { await sock.groupMemberAddMode(from, 'admin_add'); } catch (e) {}
            sock.sendCustom(from, { text: reply("🛡️ 𝗔𝗡𝗧𝗜-𝗔𝗗𝗗", ["Activé ✅", "Seuls les admins peuvent ajouter des membres."]) });

        } else if (action === 'off') {
            config.antiadd[from] = false;
            writeConfig(sock, config);
            try { await sock.groupMemberAddMode(from, 'all_member_add'); } catch (e) {}
            sock.sendCustom(from, { text: reply("🛡️ 𝗔𝗡𝗧𝗜-𝗔𝗗𝗗", ["Désactivé ❌"]) });

        } else {
            sock.sendCustom(from, { text: reply("📌 𝗨𝗧𝗜𝗟𝗜𝗦𝗔𝗧𝗜𝗢𝗡", [".antiadd on", ".antiadd off"]) });
        }
    }
};
