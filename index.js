const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options");
const sequelize = require("./db");
const UserModel = require("./models");

const token = "7230250934:AAEQHycIMxtzt-rFqCKsQHfSxlBdAUvQETk";
const bot = new TelegramApi(token, { polling: true });
const chats = {};

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.log("Подключение к БД не работает!", error);
  }

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

    try {
      if (text === "/start") {
        await UserModel.create({chatId})
        await bot.sendSticker(
          chatId,
          "https://telegram-apps.github.io/wp-content/uploads/2020/10/164.png"
        );
        return bot.sendMessage(
          chatId,
          `Hello, my friend! You just now started bot`
        );
      }

      if (text === "/info") {
        const user = UserModel.findOne({chatId});
        return bot.sendMessage(
          chatId,
          `Your name ${msg.from.first_name} ${msg.from.last_name}. У тебя ${user.right} правильных и ${user.wrong} неправильных ответов.`
        );
      }

      if (text === "/game") {
        return startGame(chatId);
      }

      return bot.sendMessage(
        chatId,
        "This is wrong command! Try again, please!"
      );
    } catch (error) {
      bot.sendMessage(chatId, "Произошла какая-то ошибка");
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
      return startGame(chatId);
    }

    const user = UserModel.findOne({chatId});

    if (+data === chats[chatId]) {
      user.right += 1;
      await bot.sendMessage(
        chatId,
        `Congratulation! You choose right the digit ${chats[chatId]}`,
        againOptions
      );
    } else {
      user.wrong += 1;
      await bot.sendMessage(
        chatId,
        ` Data - ${msg.data} ${typeof data} ${typeof chats[
          chatId
        ]} Вы выбрали ${data}, это неверная цифра! Правильная цифра - ${
          chats[chatId]
        }`,
        againOptions
      )
      await user.save();
    }
  });

};

start();
