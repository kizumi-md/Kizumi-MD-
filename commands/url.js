const axios = require('axios');
const FormData = require('form-data');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const { reply } = require('../utils/ninjaStyle');

module.exports = {
    name: 'url',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;
        const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || !quoted.imageMessage) {
            return sock.sendMessage(from, {
                text: reply("⚠️ 𝗨𝗧𝗜𝗟𝗜𝗦𝗔𝗧𝗜𝗢𝗡", ["Réponds à une image."])
            }, { quoted: m });
        }

        await sock.sendMessage(from, { text: reply("⏳ 𝗨𝗣𝗟𝗢𝗔𝗗", ["Upload en cours..."]) }, { quoted: m });

        try {
            const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

            const apiKey = process.env.IMGBB_KEY;
            if (!apiKey) {
                return sock.sendMessage(from, {
                    text: reply("❌ 𝗖𝗢𝗡𝗙𝗜𝗚 𝗠𝗔𝗡𝗤𝗨𝗔𝗡𝗧𝗘", ["IMGBB_KEY manquante dans env/.env"])
                }, { quoted: m });
            }

            const form = new FormData();
            form.append("image", buffer.toString("base64"));

            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                form,
                { headers: form.getHeaders() }
            );

            const url = res.data.data.url;

            await sock.sendMessage(from, {
                text: reply("🔗 𝗨𝗣𝗟𝗢𝗔𝗗𝗘𝗥", ["Image uploadée avec succès", `Lien : ${url}`]),
                contextInfo: {
                    externalAdReply: {
                        title: "🔗 Image Uploadée",
                        body: "Clique pour accéder au lien",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        sourceUrl: url,
                        mediaUrl: url
                    }
                }
            }, { quoted: m });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { text: reply("❌ 𝗘𝗥𝗥𝗘𝗨𝗥", ["Erreur lors de l'upload."]) }, { quoted: m });
        }
    }
};
