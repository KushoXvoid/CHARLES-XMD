const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZ4TGp1VnhDOXNjemdMNk5VRDI4OUl5Wi9kNHVZM0lkTVI2QnVHV3BFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzZneVJselRSSGYxR0FBVVhaL3hqZzlMV0VLYk9NMGI4dHE1WHlKbExuQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySTk0RGhwVkhYYmtwTVg4WlVQYy9Hd3JPWXRkcGlYa3FUUHFJSnpWZ0hFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3LzVVRVprSzNXZVhvUjF2d0c5V1A5eVZTS0lvYWVneVFvZVRJMm4wSFNjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFNeVgzeEtSSjNkTm5rZVVuTFhVMGpiZlRLWGpMeWxUZnFaZXRmRERhVmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZ0THhYUG1ua2ZmS1dqL1JxTWZyTkhVM283ZCtVK3RpbmpHeEY4TzVuVGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUNRdy9jVE5vTmJZQ3lDVHVobFkvUGxBbW9oS0I3RkpUbG83T3lpbWhGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnYvNXpiWFFkQk5jTXZiQmRyekhrd0Z4dDB1Q1VhbjZzU09GVnJGYVBDQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxneGJIZytScEJOa202SVIzYjZuNmVsdlVnUGlySUpYTEJaak9kYXpjZ1pySG84SjNmVHh4Q2c5YlBjdGpycjZ0STFzblpLamtGMDMyN1VoNzBZaUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzksImFkdlNlY3JldEtleSI6ImJiUVVJdHRIY2orMTVNeUJMQk9yS1pFZjNpWUk3RXQ4alVIODI4VTVFTjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTE2MTc5OTI0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzRDZGRDNDNEIxNzNDOEY3ODIwQUFCQzQyNTFBRTkzQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyNzQ3MTgwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MTYxNzk5MjQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhFQzYwNUU4QzQ5NUU5RjMxRTFFMkM0MDZEMjBERERBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI3NDcxODF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxNjE3OTkyNDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUU1NTc2NUNEMTBEN0YwODIyRDdEOUVCMkVEQTMwQTEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1Mjc0NzE5NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTE2MTc5OTI0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGRkM1QUFFNDUwRjQ1MTkzMDlBNjc1RTYyQTE3OTdGMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyNzQ3MjA3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxMjNMT1RVUyIsIm1lIjp7ImlkIjoiMjM0OTE2MTc5OTI0MzozN0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjM0NDgwNTUxMTUzODM4OjM3QGxpZCIsIm5hbWUiOiJLxatzaG8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lETnpvTUJFSm1aNDhNR0dBc2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InBDQkJocFR5MDBBYmJuVHlla0tmTzhmNGJPb3ZqbW1kYWZqd3E1cUFZU0E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjlXR0lEU21ybFNNSzdHbjVNOWdybUlPdTJ1dE5aZTFKanJFTXhZRS9TajI5MG85emtoSDJHMjFiU0Q0N2hVSUVQMDJiREc1Q3pmQXo2bzd0eWxZaENRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJxNjNOakZvTm5nM2R6UUh5cUVMK3J5bkUvSmszKzhqZXVnWmRkTVprQzVEQlg4QmdGcUR5c0k2enpYS0xpamJXVGhMcnZ6T1Y1MDZ0MmIyanNpNEVCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxNjE3OTkyNDM6MzdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYVFnUVlhVTh0TkFHMjUwOG5wQ256dkgrR3pxTDQ1cG5XbjQ4S3VhZ0dFZyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyNzQ3MTc1LCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURRVCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®Charleske",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254759626063",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
