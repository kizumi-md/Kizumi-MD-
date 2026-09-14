const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { reply } = require('../utils/ninjaStyle');

module.exports = {
    name: 'sticker',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;
        const quoted = m.message.extendedTextMessage?.contextInfo?.quotedMessage || m.message;
        const mime = (quoted.imageMessage || quoted.videoMessage || quoted.viewOnceMessageV2?.message?.imageMessage || quoted.viewOnceMessageV2?.message?.videoMessage)?.mimetype || '';

        if (!/image|video/.test(mime)) {
            return sock.sendCustom(from, {
                text: reply("🎬 𝗞𝗜𝗭𝗨𝗠𝗜 • 𝗠𝗘𝗗𝗜𝗔", ["Réponds à une image ou une vidéo pour créer un sticker."])
            });
        }

        try {
            const messageType = quoted.imageMessage ? 'image' : 'video';
            const stream = await downloadContentFromMessage(quoted.imageMessage || quoted.videoMessage || quoted.viewOnceMessageV2?.message?.imageMessage || quoted.viewOnceMessageV2?.message?.videoMessage, messageType);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

            const sticker = new Sticker(buffer, {
                pack: '𝖳𝖧𝖤 𝖳𝖸𝖫𝖠',
                author: 'Miss Tyla',
                type: StickerTypes.FULL,
                categories: ['🐉', '⚔️'],
                id: '12345',
                quality: 50,
            });

            const stickerBuffer = await sticker.toBuffer();
            await sock.sendMessage(from, { sticker: stickerBuffer }, { quoted: m });
        } catch (e) {
            sock.sendCustom(from, { text: reply("❌ 𝗘𝗥𝗥𝗘𝗨𝗥", [e.message]) });
        }
    }
};
