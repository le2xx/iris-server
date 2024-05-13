export enum TelegramCommands {
  start = 'start',
  help = 'help',
  rss_add = 'rss_add',
  rss_list = 'rss_list',
}

export type TelegramCommandsItem = {
  command: TelegramCommands;
  description: string;
};

export type RssItem = {
  name: string;
  url: string;
};
