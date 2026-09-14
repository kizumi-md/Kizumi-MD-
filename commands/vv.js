const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { reply } = require('../utils/ninjaStyle');

function unwrapMessage(msg) {
    while (true) {
        if (!msg) return null;
        if (msg.ephemeralMessage) msg = msg.ephemeralMessage.message;
        else if (msg.viewOnceMessageV2) msg = msg.viewOnceMessageV2.message;
        else if (msg.viewOnceMessage) msg = msg.viewOnceMessage.message;
        else return msg;
    }
}

module.exports = {
    name: 'vv',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;

        try {
            const ctx = m.message?.extendedTextMessage?.contextInfo;
            if (!ctx?.quotedMessage) {
                return sock.sendCustom(from, { text: reply("⚠️ 𝗨𝗧𝗜𝗟𝗜𝗦𝗔𝗧𝗜𝗢𝗡", ["Réponds à un message vue unique."]) });
            }

            let msg = unwrapMessage(ctx.quotedMessage);
            if (!msg) {
                return sock.sendCustom(from, { text: reply("❌ 𝗘𝗥𝗥𝗘𝗨𝗥", ["Impossible de lire le message."]) });
            }

            const type = Object.keys(msg)[0];
            if (!type || (!type.includes("imageMessage") && !type.includes("videoMessage"))) {
                return sock.sendCustom(from, { text: reply("⚠️ 𝗜𝗡𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗟𝗘", ["Ce message n'est pas une image/vidéo vue unique."]) });
            }

            const media = msg[type];
            const stream = await downloadContentFromMessage(media, type.replace("Message", "").toLowerCase());
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

            const caption = reply("👁️ 𝗩𝗨𝗘 𝗨𝗡𝗜𝗤𝗨𝗘 𝗗𝗘́𝗕𝗟𝗢𝗤𝗨𝗘́𝗘", ["Récupération réussie ✅"]);

            if (type.includes("imageMessage")) {
                await sock.sendMessage(from, { image: buffer, caption }, { quoted: m });
            } else {
                await sock.sendMessage(from, { video: buffer, caption }, { quoted: m });
            }

        } catch (e) {
            console.log("Erreur VV:", e);
            await sock.sendCustom(from, { text: reply("❌ 𝗘𝗥𝗥𝗘𝗨𝗥", ["Erreur lors de la récupération."]) });
        }
    }
};
