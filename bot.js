const {Telegraf} = require('telegraf');
const crypto = require('crypto-js');

const web_link = 'https://june-tg-bot.baboons.tech/';
const TOKEN = '7914604069:AAFNrVN4BGxeXcjhonTz-uRQqM79n5xk2QM';


const bot = new Telegraf(TOKEN);
var secretKey =
  '02PhgD8F4bgtA0T8WB2/y0dvrtHKXXMwtht3HZgyHSzAUrJwXRYjUV9z0lLBbass';

function random16String() {
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return String(result);
}

function encrypt(text) {
  var derived_key = crypto.enc.Base64.parse(secretKey);

  let randomInt16 = random16String();
  // Generating a random 16-digit string to be used as the initialization vector (IV)
  var iv = crypto.enc.Utf8.parse(randomInt16);

  // Encrypting
  var payload = crypto.AES.encrypt(text, derived_key, {
    iv: iv,
    mode: crypto.mode.CBC,
  }).toString();

  // Combining the random 16-digit number and the encrypted payload
  return randomInt16 + payload;
}

bot.command('start', async (ctx) => {
  const userId = ctx.update.message.from.id;
  var encrypted = encrypt(userId.toString());

  let web_final_link = '';
  if (ctx.payload) {
    web_final_link =
      web_link +
      '?tgId=' +
      encodeURIComponent(encrypted) +
      '&ref=' +
      encodeURIComponent(ctx.payload);
  } else {
    web_final_link = web_link + '?tgId=' + encodeURIComponent(encrypted);
  }
  ctx.replyWithPhoto(
    {
      source: 'tgcover.jpg',
    },
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🕹 Play & Earn',
              web_app: {
                url: web_final_link,
              },
            },
          ],
          [{text: '🔊 Telegram COMMUNITY', url: 'https://t.me/crypto_june'}],
          [{text: '🫂 FOLLOW X', url: 'https://x.com/crypto_june'}],
        ],
      },
      caption: 'Start snow in june ' + '\n' + "Let's tap-tap snow and win!",
    }
  );
  ctx.setChatMenuButton({
    text: 'Game',
    type: 'web_app',
    web_app: {
      url: web_final_link,
    },
  });
  // sets Web App as the menu button for current chat
});

bot.launch();
