import { TelegramCommandsItem } from './telegram.models';

export const startTemplate = (name: string) => {
  return `<b>Привет, ${name}</b>`;
};

export const helpTemplate = (commandsList: TelegramCommandsItem[]) => {
  return (
    '<b>Список команд</b>\n\n' +
    commandsList
      .map((item) => {
        return `/<b>${item.command}</b> - <i>${item.description}</i>`;
      })
      .join('\n')
  );
};
