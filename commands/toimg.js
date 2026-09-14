const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { reply } = require('../utils/ninjaStyle');

module.exports = {
    name: 'toimg',

    async execute(sock, m, args) {
        const from = m.key.remoteJid;

        const context = m.message?.extendedTextMessage?.contextInfo;
        const quoted = context?.quotedMessage?.stickerMessage;

        if (!quoted) {
            return sock.sendCustom(from, {
                text: reply("🎬 𝗧𝗢𝗜𝗠𝗚", ["Réponds à un sticker NON animé pour convertir."])
            });
        }

        try {
            const stream = await downloadContentFromMessage(quoted, 'sticker');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

            const user = m.key.participant || m.key.remoteJid;
            const date = new Date().toLocaleDateString();

            await sock.sendMessage(from, {
                image: buffer,
                caption: reply("🖼️ 𝗖𝗢𝗡𝗩𝗘𝗥𝗦𝗜𝗢𝗡 𝗥𝗘́𝗨𝗦𝗦𝗜𝗘", [
                    "Mode : STICKER ➜ IMAGE",
                    `Par : @${user.split("@")[0]}`,
                    `Date : ${date}`
                ]),
                mentions: [user]
            }, { quoted: m });

        } catch (e) {
            console.log(e);
            sock.sendCustom(from, { text: reply("❌ 𝗘𝗥𝗥𝗘𝗨𝗥", ["Conversion sticker → image impossible."]) });
        }
    }
};
