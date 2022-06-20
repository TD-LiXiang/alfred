import { Command } from "../types"

export const commands: Command[] = [
  {
    command: "create new email conversation",
    description: "Create a new email conversation",
    shortcutKey: "Shit+T",
  },
  {
    command: "create new sms conversation",
    description: "Create a new sms conversation",
    shortcutKey: "Shit+N",
  },
  {
    command: "create new email conversation",
    description: "Create a new email conversation",
    shortcutKey: "Shit+T",
  },
  {
    command: "create new sms conversation",
    description: "Create a new sms conversation",
    shortcutKey: "Shit+N",
  },
  {
    command: "create new email conversation",
    description: "Create a new email conversation",
    shortcutKey: "Shit+T",
  },
  {
    command: "create new sms conversation",
    description: "Create a new sms conversation",
    shortcutKey: "Shit+N",
  },
  {
    command: "create new email conversation",
    description: "Create a new email conversation",
    shortcutKey: "Shit+T",
  },
  {
    command: "create new sms conversation",
    description: "Create a new sms conversation",
    shortcutKey: "Shit+N",
  },
  {
    command: "create new email conversation",
    description: "Create a new email conversation",
    shortcutKey: "Shit+T",
  },
  {
    command: "create new sms conversation",
    description: "Create a new sms conversation",
    shortcutKey: "Shit+N",
  },
]

export const commandMap = commands.reduce((acc, command) => {
  acc[command.shortcutKey.split("+").join("")] = command

  return acc
}, {})
