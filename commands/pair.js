const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, delay } = require("@whiskeysockets/baileys");
const pino = require("pino");
const fs = require('fs-extra');
const path = require('path');
const { reply } = require('../utils/ninjaStyle');

module.exports = {
    name: 'pair',
    async execute(sock, m, args) {
        const from = m.key.remoteJid;
        const phoneNumber = args[0]?.replace(/[^0-9]/g, '');

        if (!phoneNumber) {
            return sock.sendCustom(from, {
                text: reply("🔗 𝗣𝗔𝗜𝗥𝗜𝗡𝗚", [".pair [numéro] pour ouvrir une session", "Exemple : .pair 222233344"])
            });
        }

        await sock.sendCustom(from, {
            text: reply("⏳ 𝗚𝗘́𝗡𝗘́𝗥𝗔𝗧𝗜𝗢𝗡", [`Numéro : ${phoneNumber}`])
        });

        const sessionID = `session_${Date.now()}`;
        const sessionPath = path.join(__dirname, `../temp_sessions/${sessionID}`);
        let newSock = null;

        try {
            const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
            const { version } = await fetchLatestBaileysVersion();

            newSock = makeWASocket({
                version,
                logger: pino({ level: "silent" }),
                printQRInTerminal: false,
                auth: state,
                browser: ["Ubuntu", "Chrome", "20.0.04"]
            });

            if (!newSock.authState.creds.registered) {
                await delay(3000);
                let code = await newSock.requestPairingCode(phoneNumber);

                await sock.sendCustom(from, {
                    text: reply("✅ 𝗖𝗢𝗗𝗘 𝗚𝗘́𝗡𝗘́𝗥𝗘́", [
                        `Code : ${code}`,
                        `Entre-le sur le WhatsApp de ${phoneNumber}.`
                    ])
                });
            }

        } catch (e) {
            await sock.sendCustom(from, {
                text: reply("❌ 𝗘𝗥𝗥𝗘𝗨𝗥", [e.message])
            });
        } finally {
            // IMPORTANT (correctif fuite disque/mémoire) : cette commande ne
            // garde jamais la session ouverte (ce n'est pas une session gérée
            // par le bot), donc on ferme systématiquement la connexion et on
            // supprime le dossier temporaire, que le pairing ait réussi ou non.
            // Sans ça, chaque .pair laissait un dossier + une connexion
            // WebSocket orphelins, jusqu'à saturer le disque (ENOSPC).
            try { if (newSock) newSock.end(undefined); } catch (e) {}
            setTimeout(() => {
                fs.remove(sessionPath).catch(() => {});
            }, 60000); // on laisse 60s au cas où l'utilisateur entre encore le code
        }
    }
};
