import {
  RssItem,
  TelegramCommands,
  TelegramCommandsItem,
} from './telegram.models';

export const telegramCommandsList: TelegramCommandsItem[] = [
  { command: TelegramCommands.start, description: 'старт бота' },
  { command: TelegramCommands.help, description: 'список команд' },
  { command: TelegramCommands.rss_list, description: 'список rss каналов' },
  { command: TelegramCommands.rss_add, description: 'добавить rss канал' },
];

export const rssList: RssItem[] = [
  {
    name: 'Habr Articles',
    url: 'https://habr.com/ru/rss/articles/?fl=ru',
  },
  {
    name: 'Habr Articles',
    url: 'https://habr.com/ru/rss/articles/?fl=ru',
  },
  {
    name: 'Habr Articles',
    url: 'https://habr.com/ru/rss/articles/?fl=ru',
  },
  {
    name: 'Habr Articles',
    url: 'https://habr.com/ru/rss/articles/?fl=ru',
  },
  {
    name: 'Habr Articles',
    url: 'https://habr.com/ru/rss/articles/?fl=ru',
  },
  {
    name: 'Habr Articles',
    url: 'https://habr.com/ru/rss/articles/?fl=ru',
  },
];
