# SKARA NICE Ã¢â‚¬â€ Pairing WhatsApp via Telegram (multi-session)

## Ce qui a changÃƒÂ©

- **Aucune commande WhatsApp n'a ÃƒÂ©tÃƒÂ© supprimÃƒÂ©e** : `commandes/` est intact (100+ fichiers).
- La connexion WhatsApp **ne se fait plus via `env/.env` au dÃƒÂ©marrage du serveur**.
- Elle se fait maintenant **depuis Telegram**, avec `/pair <numÃƒÂ©ro>`.
- **Chaque utilisateur Telegram = sa propre session WhatsApp**, isolÃƒÂ©e des autres (1 chatId Telegram Ã¢â€ â€™ 1 connexion WhatsApp maximum).
- Jusqu'Ãƒ  **1500 sessions WhatsApp simultanÃƒÂ©es** (rÃƒÂ©glable via `MAX_SESSIONS` dans `telegram/.env`).
- Toutes les sessions dÃƒÂ©jÃƒ  appairÃƒÂ©es sont **restaurÃƒÂ©es automatiquement** au redÃƒÂ©marrage du serveur.

## Installation

```bash
npm install
```

(toutes les dÃƒÂ©pendances nÃƒÂ©cessaires Ã¢â‚¬â€ Telegram et WhatsApp Ã¢â‚¬â€ sont dÃƒÂ©jÃƒ  dans le `package.json` racine).

## Configuration

1. `telegram/.env` :
   - `TG_TOKEN` Ã¢â‚¬â€ le token de votre bot Telegram (@BotFather)
   - `OWNER_TG_IDS` Ã¢â‚¬â€ vos ID(s) Telegram (rÃƒÂ©cupÃƒÂ©rables avec `/id`)
   - `MAX_SESSIONS` Ã¢â‚¬â€ 1500 par dÃƒÂ©faut
2. `env/.env` : inchangÃƒÂ©, sert toujours pour `OWNER_NUMBER` (admin global) et `PREFIX` des commandes WhatsApp.

## DÃƒÂ©marrage

```bash
node index.js
```

Cela dÃƒÂ©marre **uniquement le bot Telegram**. Aucune connexion WhatsApp n'est lancÃƒÂ©e tant qu'un utilisateur n'a pas fait `/pair`.

## Utilisation (cÃƒÂ´tÃƒÂ© Telegram)

- `/start` Ã¢â€ â€™ menu principal (image SKARA NICE + sections Pairing / System / User / Other)
- `/pair 22896985431` Ã¢â€ â€™ gÃƒÂ©nÃƒÂ¨re un code de jumelage WhatsApp
- `/session` Ã¢â€ â€™ statut de votre session
- `/delpair` Ã¢â€ â€™ dÃƒÂ©connecte et supprime votre session
- `/ping`, `/runtime`, `/status` Ã¢â€ â€™ infos systÃƒÂ¨me
- `/me`, `/id`, `/owner` Ã¢â€ â€™ infos utilisateur
- `/help`, `/about`, `/support` Ã¢â€ â€™ aide

## Architecture

```
racine/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ commandes/            Ã¢â€ Â vos commandes WhatsApp (INCHANGÃƒâ€°ES)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ env/                  Ã¢â€ Â .env + config.json existants (INCHANGÃƒâ€°S)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ images/                + skara_start.jpg (image du /start Telegram)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ utils/sendWithContext.js  Ã¢â€ Â INCHANGÃƒâ€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ wa/messageHandler.js  Ã¢â€ Â logique WhatsApp extraite de l'ancien index.js,
Ã¢â€â€š                            rÃƒÂ©utilisable pour CHAQUE session (NOUVEAU)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ telegram/              Ã¢â€ Â couche Telegram demandÃƒÂ©e (NOUVEAU)
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ commands/          (start, help, pair, session, delpair, ping,
Ã¢â€â€š   Ã¢â€â€š                        runtime, status, owner + me, id, about, support)
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ handlers/           (commandHandler.js, callbackHandler.js)
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ keyboards/          (inline.js, reply.js)
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ utils/               config.js, logger.js, functions.js
Ã¢â€â€š   Ã¢â€â€š                        + sessionManager.js (gestionnaire multi-session,
Ã¢â€â€š   Ã¢â€â€š                          ajoutÃƒÂ© car indispensable au-delÃƒ  d'1 session)
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ .env
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ index.js
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ package.json       (informatif Ã¢â‚¬â€ l'install rÃƒÂ©elle est Ãƒ  la racine)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ index.js               Ã¢â€ Â NOUVEAU point d'entrÃƒÂ©e (dÃƒÂ©marre Telegram uniquement)
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ index.old.js.bak       Ã¢â€ Â ancien index.js conservÃƒÂ© pour rÃƒÂ©fÃƒÂ©rence
```

## Note technique

`telegram/utils/sessionManager.js` n'ÃƒÂ©tait pas dans l'arborescence demandÃƒÂ©e, mais
c'est le fichier qui rend le multi-session possible : il garde en mÃƒÂ©moire une
`Map(chatId Ã¢â€ â€™ session WhatsApp)`, applique la limite de 1500, gÃƒÂ¨re les
reconnexions automatiques et branche `wa/messageHandler.js` (donc toutes vos
commandes WhatsApp existantes) sur chaque session dÃƒÂ¨s sa crÃƒÂ©ation.

---

## Ã°Å¸Å’Â Site de pairing web (thÃƒÂ¨me Lloyd)

Un deuxiÃƒÂ¨me point d'entrÃƒÂ©e totalement indÃƒÂ©pendant : un site oÃƒÂ¹ chaque visiteur
tape son numÃƒÂ©ro et reÃƒÂ§oit son code de jumelage, sans passer par Telegram.

```
web/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ public/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ index.html        Ã¢â€ Â page stylÃƒÂ©e thÃƒÂ¨me Lloyd (SKARA NICE)
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ lloyd-bg.jpg       Ã¢â€ Â image de fond
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ utils/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ config.js
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ webSessionManager.js   Ã¢â€ Â ÃƒÂ©quivalent web de telegram/utils/sessionManager.js
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ .env
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ server.js
```

### Comment ÃƒÂ§a marche

- Chaque visiteur reÃƒÂ§oit un cookie `sn_sid` (UUID) au premier chargement : c'est
  sa clÃƒÂ© de session, exactement comme le `chatId` pour Telegram.
- `POST /api/pair { number }` crÃƒÂ©e sa session WhatsApp et renvoie le code de
  jumelage Ãƒ  afficher.
- `GET /api/status` renvoie l'ÃƒÂ©tat de sa session (`idle` / `connecting` /
  `connected` / `disconnected`) Ã¢â‚¬â€ la page fait un polling automatique aprÃƒÂ¨s
  avoir affichÃƒÂ© le code, pour afficher "Ã¢Å“â€ ConnectÃƒÂ©" dÃƒÂ¨s que c'est bon.
- `GET /api/stats` renvoie `{ connected, disconnected, capacity }`, affichÃƒÂ© en
  haut de la page.
- Toutes les commandes WhatsApp existantes (`commandes/`) sont branchÃƒÂ©es sur
  chaque session via `wa/messageHandler.js`, exactement comme cÃƒÂ´tÃƒÂ© Telegram.
- Les sessions web sont stockÃƒÂ©es dans `web_sessions/` (sÃƒÂ©parÃƒÂ© de
  `telegram_sessions/`) Ã¢â‚¬â€ les deux couches tournent en parallÃƒÂ¨le sans conflit,
  un mÃƒÂªme bot peut donc accepter des connexions depuis Telegram **et** depuis
  le site en mÃƒÂªme temps.

### DÃƒÂ©marrage

```bash
npm install
node web/server.js
# ou : npm run start:web
```

Le site tourne alors sur `http://localhost:3000` (port rÃƒÂ©glable via
`WEB_PORT` dans `web/.env`).

Pour lancer Telegram **et** le site en mÃƒÂªme temps :

```bash
npm run start:all
```

### Configuration (`web/.env`)

- `WEB_PORT` Ã¢â‚¬â€ port d'ÃƒÂ©coute (3000 par dÃƒÂ©faut)
- `MAX_SESSIONS` Ã¢â‚¬â€ capacitÃƒÂ© max de sessions WhatsApp sur le site (1500 par dÃƒÂ©faut)
- `COOKIE_SECRET` Ã¢â‚¬â€ Ãƒ  changer en production

### DÃƒÂ©ploiement

Le site est un serveur Express classique : dÃƒÂ©ployable sur n'importe quel
hÃƒÂ©bergeur Node (VPS, Railway, Render...). Pensez Ãƒ  :
- Mettre le site derriÃƒÂ¨re HTTPS (obligatoire pour que le cookie de session
  soit fiable en production)
- Ajuster `COOKIE_SECRET` dans `web/.env`
- Garder `web_sessions/` sur un disque persistant, sinon toutes les connexions
  sont perdues Ãƒ  chaque redÃƒÂ©ploiement

---

## Ã°Å¸Â¥Â· Reskin Ninjago "PERFECT CORE N.C"

Toutes les commandes utilisent maintenant un style visuel unique, cohÃƒÂ©rent,
dÃƒÂ©fini dans `utils/ninjaStyle.js` :

```js
const { reply } = require('../utils/ninjaStyle');
sock.sendCustom(from, { text: reply("TITRE", ["ligne 1", "ligne 2"]) });
```

- `.menu` envoie la vidÃƒÂ©o du dojo en boucle (gifPlayback) + le menu complet,
  organisÃƒÂ© par sections (Spinjitzu Core, Dojo Control, Shadow Actions, Dragon
  Shield, Ninja Fun, Dragon Media, Master AI, Training Arena, System Force).
- Les 23 anciennes commandes au style "MCKINGER XMD / X VOID" ont ÃƒÂ©tÃƒÂ©
  rÃƒÂ©ÃƒÂ©crites avec la nouvelle charte, logique mÃƒÂ©tier inchangÃƒÂ©e.
- Les 41 commandes qui n'ÃƒÂ©taient que des placeholders ("commande activÃƒÂ©e et
  prÃƒÂªte Ãƒ  ÃƒÂªtre configurÃƒÂ©e...") ont toutes ÃƒÂ©tÃƒÂ© codÃƒÂ©es avec une vraie logique
  fonctionnelle (voir dÃƒÂ©tail plus bas).
- **`.tg <lien_pack_telegram> [numÃƒÂ©ro]`** Ã¢â‚¬â€ nouvelle commande : convertit un
  sticker d'un pack Telegram public en sticker WhatsApp, en rÃƒÂ©utilisant le
  `TG_TOKEN` dÃƒÂ©jÃƒ  configurÃƒÂ© dans `telegram/.env`.
- Un doublon `.antilink` / `.antillink` (bug de frappe qui rendait `.antilink`
  inutilisable) a ÃƒÂ©tÃƒÂ© fusionnÃƒÂ© en un seul fichier fonctionnel.
- `sendWithContext.js` injectait encore l'ancienne pub "MCKINGER X VOID" dans
  CHAQUE message envoyÃƒÂ© (y compris les nouveaux styles) Ã¢â‚¬â€ corrigÃƒÂ© pour
  reflÃƒÂ©ter PERFECT CORE N.C.

### Commandes dÃƒÂ©sormais rÃƒÂ©ellement implÃƒÂ©mentÃƒÂ©es (au lieu de placeholders)

- **Fun/statique** : joke, fact, quote, dare, truth, dice, roll, ship, meme
  (API publique meme-api.com)
- **Jeux/points** : daily, quiz, guess, tictactoe, game, leaderboard Ã¢â‚¬â€ tous
  branchÃƒÂ©s sur `utils/pointsStore.js` (fichier JSON persistant)
- **Groupe** : alladmin, everyone, mentionall
- **Diffusion** : broadcast, bcgroup, bcpm, sendall, forward, copy
- **IA / texte** : ask, chat, gpt, rephrase (via `utils/aiClient.js`, Ãƒ 
  configurer avec `AI_API_KEY` dans `env/.env` Ã¢â‚¬â€ sans clÃƒÂ©, message clair au
  lieu d'une fausse rÃƒÂ©ponse) ; translate (API gratuite MyMemory, aucune clÃƒÂ©) ;
  define (dictionaryapi.dev, anglais, gratuit) ; summarize (rÃƒÂ©sumÃƒÂ© extractif
  local, aucune IA/clÃƒÂ© nÃƒÂ©cessaire)
- **SystÃƒÂ¨me** : backup/restore (sauvegarde rÃƒÂ©elle de la config de session en
  fichier .json), clearchat (supprime les derniers messages du bot), exec
  (shell + `js:` eval, dÃƒÂ©jÃƒ  rÃƒÂ©servÃƒÂ© au propriÃƒÂ©taire), update (git pull rÃƒÂ©el),
  uptime, math (ÃƒÂ©valuateur sÃƒÂ©curisÃƒÂ©), pp (photo de profil)

### Ã¢Å¡ Ã¯Â¸Â Bug critique corrigÃƒÂ© : `.shutdown` / `.restart` tuaient TOUT le process

Avant, ces deux commandes faisaient `process.exit(0)` Ã¢â‚¬â€ sur un serveur qui
hÃƒÂ©berge 1500 sessions en mÃƒÂªme temps, ÃƒÂ§a arrÃƒÂªtait le bot de **tout le monde**,
pas seulement celui qui tapait la commande. Elles ferment dÃƒÂ©sormais
uniquement la connexion de la session courante (`sock.end()`), qui se
reconnecte automatiquement via le gestionnaire de session (Telegram/web).

---

## Ã°Å¸â€â€™ Correctif majeur : config isolÃƒÂ©e par session

**Avant :** `setprefix`, `setfont`, `sprefix`, `antilink`, `antibot`,
`antifake`, `antispam`, `antiadd`, `welcome`, `goodbye`, `warn` lisaient et
ÃƒÂ©crivaient TOUS le mÃƒÂªme fichier `env/config.json`, partagÃƒÂ© par toutes les
sessions WhatsApp connectÃƒÂ©es (Telegram + site confondus). Un utilisateur qui
changeait son prefix changeait celui de tout le monde.

**Maintenant :** chaque session a son propre fichier de config, isolÃƒÂ© :

```
env/sessions/<sessionId>.json
```

`<sessionId>` = le chatId Telegram ou le sid web de cette session prÃƒÂ©cise.
`wa/messageHandler.js` pose `sock.sessionId` dÃƒÂ¨s la crÃƒÂ©ation de la session
(voir `registerWAHandlers`), et **toutes** les commandes qui touchent Ãƒ  la
config utilisent dÃƒÂ©sormais `utils/sessionConfig.js` :

```js
const { readConfig, writeConfig } = require('../utils/sessionConfig');
const config = readConfig(sock);
config.prefix = '!';
writeConfig(sock, config);
```

RÃƒÂ©sultat : prefix, antilink, antibot, antifake, antispam, antiadd, welcome,
goodbye, warns Ã¢â‚¬â€ tout est dÃƒÂ©sormais propre Ãƒ  CHAQUE session. Rien n'est
partagÃƒÂ© entre utilisateurs, sauf ce qui est explicitement global (comme
`OWNER_NUMBER` dans `env/.env`, qui dÃƒÂ©finit l'administrateur du bot).

Un bonus de sÃƒÂ©curitÃƒÂ© : `.antiadd` appelle maintenant la vraie API WhatsApp
(`groupMemberAddMode`) pour restreint qui peut ajouter des membres, et
`.antispam` a une dÃƒÂ©tection rÃƒÂ©elle de flood intÃƒÂ©grÃƒÂ©e dans
`wa/messageHandler.js` (au lieu d'ÃƒÂªtre un simple interrupteur sans effet).

## Ã°Å¸Â©Â¹ Correctifs (crash disque, alignement, visibilitÃƒÂ©, rÃƒÂ©actions, idch)

Plusieurs bugs remontÃƒÂ©s en usage rÃƒÂ©el, corrigÃƒÂ©s :

1. **Crash `ENOSPC` (disque plein) qui tuait tout le bot.**
   - Cause racine : `.pair` crÃƒÂ©ait un dossier `temp_sessions/session_<timestamp>`
     et une connexion WebSocket Ãƒ  CHAQUE utilisation, sans jamais les
     nettoyer ni les fermer Ã¢â€ â€™ fuite disque + mÃƒÂ©moire qui grossit Ãƒ 
     l'infini. CorrigÃƒÂ© : nettoyage automatique aprÃƒÂ¨s chaque `.pair`.
   - Cause aggravante : `sendWithContext.js` transformait **chaque**
     rÃƒÂ©ponse texte en image (upload + encodage Ãƒ  chaque commande) Ã¢â€ â€™
     beaucoup plus lourd que nÃƒÂ©cessaire. CorrigÃƒÂ© : les rÃƒÂ©ponses restent
     du texte normal.
   - Ajout d'un filet de sÃƒÂ©curitÃƒÂ© global (`uncaughtException` /
     `unhandledRejection` dans `index.js` et `web/server.js`) : une
     erreur dans une session ne fait plus jamais planter tout le
     serveur (donc toutes les autres sessions) d'un coup.

2. **Barres/bordures dÃƒÂ©calÃƒÂ©es.** Le texte WhatsApp normal n'est pas
   monospace, donc les caractÃƒÂ¨res de dessin de boÃƒÂ®te (Ã¢â€Å’Ã¢â€â€šÃ¢â€â€Ã¢â€â‚¬) ne
   s'alignaient jamais correctement. `utils/ninjaStyle.js` et
   `commandes/menu.js` enveloppent maintenant tout le rendu en
   monospace WhatsApp (```texte```), ce qui garantit un alignement
   identique sur tous les tÃƒÂ©lÃƒÂ©phones.

3. **ExÃƒÂ©cution invisible pour les autres.** Le faux "forward depuis une
   chaÃƒÂ®ne" (`isForwarded:true`, `forwardingScore:99`) combinÃƒÂ© Ãƒ  la
   conversion systÃƒÂ©matique en image est le genre de signature que les
   systÃƒÂ¨mes anti-spam de WhatsApp peuvent restreindre cÃƒÂ´tÃƒÂ© destinataire,
   tout en restant visible sur l'appareil de l'expÃƒÂ©diteur (sync
   multi-appareil). Ce forward forcÃƒÂ© a ÃƒÂ©tÃƒÂ© retirÃƒÂ© ; les messages sont
   maintenant du texte normal, fiable pour tout le monde Ã¢â‚¬â€ en DM,
   groupes, chaÃƒÂ®nes et communautÃƒÂ©s (Ãƒ  condition, pour les chaÃƒÂ®nes et
   les groupes d'annonce des communautÃƒÂ©s, que le compte connectÃƒÂ© soit
   bien admin/propriÃƒÂ©taire, ce qui est une restriction WhatsApp
   elle-mÃƒÂªme, pas un bug du bot).

4. **RÃƒÂ©action emoji automatique.** DÃƒÂ¨s qu'une commande valide est
   reconnue, le bot rÃƒÂ©agit avec Ã¢Å¡â€Ã¯Â¸Â sur le message, avant mÃƒÂªme que la
   rÃƒÂ©ponse complÃƒÂ¨te arrive Ã¢â‚¬â€ utile pour les commandes plus longues
   (media, IA...).

5. **`.idch` accepte maintenant un lien de chaÃƒÂ®ne.** `.idch
   https://whatsapp.com/channel/xxxxx` fonctionne directement, sans
   avoir besoin d'exÃƒÂ©cuter la commande depuis l'intÃƒÂ©rieur de la chaÃƒÂ®ne.
   L'ancien comportement (dans la chaÃƒÂ®ne, ou en rÃƒÂ©ponse Ãƒ  un message de
   chaÃƒÂ®ne) reste disponible aussi.

## Ã°Å¸Â§Â¹ Nettoyage des dÃƒÂ©pendances (tÃƒÂ©lÃƒÂ©chargement Chrome bloquant)

`instagram-url-direct`, `tiktok-scraper-ts`, `qrcode-terminal`,
`node-id3` et `@adiwajshing/keyed-db` ont ÃƒÂ©tÃƒÂ© retirÃƒÂ©s de `package.json`
Ã¢â‚¬â€ **aucun n'ÃƒÂ©tait utilisÃƒÂ© nulle part dans le code** (`.instagram` et
`.tiktok` utilisent dÃƒÂ©jÃƒ  des API publiques lÃƒÂ©gÃƒÂ¨res via `axios`).

`instagram-url-direct` en particulier embarque Playwright, qui tente de
tÃƒÂ©lÃƒÂ©charger un Chrome complet (187 Mo) Ãƒ  chaque `npm install`. Sur un
hÃƒÂ©bergeur Ãƒ  stockage limitÃƒÂ©, ce tÃƒÂ©lÃƒÂ©chargement ÃƒÂ©choue en boucle et peut
mÃƒÂªme empÃƒÂªcher `dotenv` et les autres dÃƒÂ©pendances essentielles de
s'installer correctement (ce qui provoquait le crash `Cannot find
module 'dotenv'`). En le retirant, `npm install` n'essaie plus jamais
de tÃƒÂ©lÃƒÂ©charger de navigateur.

Si vous ajoutez un jour une dÃƒÂ©pendance qui refait ce genre de
tÃƒÂ©lÃƒÂ©chargement, la vraie solution est de dÃƒÂ©finir ces variables
d'environnement **de faÃƒÂ§on persistante dans le panneau d'hÃƒÂ©bergement**
(pas juste `export` dans la console, qui ne survit pas au redÃƒÂ©marrage
automatique) :
```
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
PUPPETEER_SKIP_DOWNLOAD=true
```

## Ã°Å¸Å’Â Lancer le site web sur un hÃƒÂ©bergeur mono-processus (Spaceify...)

Les panneaux type Spaceify/Pterodactyl ne suivent qu'**un seul
processus** par serveur. `node index.js` (Telegram) et
`node web/server.js` (site) sÃƒÂ©parÃƒÂ©ment ne fonctionnent donc pas sur ce
genre d'hÃƒÂ©bergeur : le panneau ne verrait que le premier lancÃƒÂ©.

**Solution : `start-all.js`** lance les deux dans le MÃƒÅ ME processus.

Dans votre panneau, changez le fichier de dÃƒÂ©marrage (souvent une
variable "Main File" / "JS_FILE" dans les paramÃƒÂ¨tres de dÃƒÂ©marrage) pour
`start-all.js` au lieu de `index.js`. Ou, si le panneau exÃƒÂ©cute une
commande complÃƒÂ¨te, utilisez :
```
npm run start:all
```

Le site ÃƒÂ©coute automatiquement sur le port allouÃƒÂ© par votre hÃƒÂ©bergeur
(`SERVER_PORT` ou `PORT`, injectÃƒÂ©s automatiquement par la plupart des
panneaux), sinon sur `WEB_PORT` dÃƒÂ©fini dans `web/.env`, sinon 3000 par
dÃƒÂ©faut.

**Pour trouver le lien du site :** dans Spaceify, l'onglet rÃƒÂ©seau /
allocations du serveur affiche l'adresse et le port publics (visible
dans vos captures prÃƒÂ©cÃƒÂ©dentes : "Address: de29.spaceify.eu:25425" par
exemple). C'est cette adresse-lÃƒ  qu'il faut ouvrir dans un navigateur
une fois `start-all.js` lancÃƒÂ© Ã¢â‚¬â€ pas `localhost`.

## Ã°Å¸Å½Â¨ Refonte complÃƒÂ¨te du site (v2)

- Nouveau logo (crest LEGO Ninjago) + nouveau texte de marque exact
  demandÃƒÂ©, en dÃƒÂ©gradÃƒÂ© chrome.
- Texte rÃƒÂ©duit au strict minimum partout (fini les paragraphes
  explicatifs).
- **QR code en option**, en plus du code de jumelage classique Ã¢â‚¬â€ bascule
  Code/QR directement sur la page (`GET /api/status` renvoie maintenant
  aussi `qrDataUrl`, gÃƒÂ©nÃƒÂ©rÃƒÂ© cÃƒÂ´tÃƒÂ© serveur avec le paquet `qrcode`, jamais
  partagÃƒÂ© Ãƒ  un service tiers).
- **Bouton copier** le code en un clic.
- **Bouton dÃƒÂ©connecter** directement sur le site une fois connectÃƒÂ©
  (utilise `/api/delpair`, dÃƒÂ©jÃƒ  existant cÃƒÂ´tÃƒÂ© serveur).

## Ã°Å¸Â©Â¹ Autres correctifs de cette itÃƒÂ©ration

- `.menu` : la vidÃƒÂ©o est maintenant mise en cache aprÃƒÂ¨s le premier
  tÃƒÂ©lÃƒÂ©chargement (plus rapide, moins de dÃƒÂ©pendance rÃƒÂ©seau Ãƒ  chaque
  appel), avec un timeout plus long et un vrai message d'erreur dans
  les logs si ÃƒÂ§a ÃƒÂ©choue.
- VisibilitÃƒÂ© chez les autres participants : ajout d'un rafraÃƒÂ®chissement
  des mÃƒÂ©tadonnÃƒÂ©es de groupe avant le premier envoi dans un groupe
  (aide Ãƒ  la distribution des clÃƒÂ©s de chiffrement). **Point
  d'honnÃƒÂªtetÃƒÂ©** : ce problÃƒÂ¨me est un bug/limitation connu et documentÃƒÂ©
  de Baileys lui-mÃƒÂªme (voir issues GitHub #861, #1963, #1387 du dÃƒÂ©pÃƒÂ´t
  WhiskeySockets/Baileys) Ã¢â‚¬â€ intermittent et pas garanti Ãƒ  100%
  rÃƒÂ©solu par ce correctif, la librairie elle-mÃƒÂªme a ce dÃƒÂ©faut par
  moments.
