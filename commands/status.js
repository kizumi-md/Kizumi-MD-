const { reply } = require('../utils/ninjaStyle');

module.exports = {
    name: 'status',

    async execute(sock, m, args) {
        const from = m.key.remoteJid;

        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const statusMsg = reply("📊 𝗦𝗬𝗦𝗧𝗘𝗠 • 𝗦𝗧𝗔𝗧𝗨𝗦", [
            "Bot : ONLINE",
            "Statut : ACTIVE",
            `Uptime : ${hours}h ${minutes}m ${seconds}s`,
            "Core : Stable",
            "Engine : Running",
            "Memory : Optimal"
        ]);

        await sock.sendCustom(from, { text: statusMsg }, { quoted: m });
    }
};
