const TelegramApi = require("node-telegram-bot-api");
const {gameOptions, againOptions} = require('./options');
const token = "7230250934:AAEQHycIMxtzt-rFqCKsQHfSxlBdAUvQETk";
const bot = new TelegramApi(token, { polling: true });
const chats = {};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "You start bots" },
    { command: "/info", description: "This is information about your account" },
    { command: "/game", description: "Запуск игры" },
  ]);

  const startGame = async (chatId) => {
    await bot.sendMessage(
      chatId,
      "Сейчас я загадаю тебе число от 1 до 9 и ты должен его отгадать!"
    );
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;

    await bot.sendMessage(chatId, "Отгадай", gameOptions);
  };

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "https://telegram-apps.github.io/wp-content/uploads/2020/10/164.png"
      );
      return bot.sendMessage(
        chatId,
        `Hello, my friend! You just now started bot`
      );
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Your name ${msg.from.first_name} ${msg.from.last_name}`
      );
    }

    if (text === "/game") {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, "This is wrong command! Try again, please!");
  });

  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
      return startGame(chatId);
    }

    if (+data === chats[chatId]) {
      bot.sendMessage(
        chatId,
        `Congratulation! You choose right the digit ${chats[chatId]}`,
        againOptions
      );
    } else {
      bot.sendMessage(
        chatId,
        ` Data - ${msg.data} ${typeof data} ${typeof chats[
          chatId
        ]} Вы выбрали ${data}, это неверная цифра! Правильная цифра - ${
          chats[chatId]
        }`,
        againOptions
      );
    }
  });
};

start();
