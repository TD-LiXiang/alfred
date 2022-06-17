import { CommandPalette } from "./components/command-palette"
import { useEffect, useState } from "react"
import { commandMap, commands } from "./models/commands"
import { Command } from "./typings"
import { fromEvent } from "rxjs"
import { pluck, bufferCount } from "rxjs/operators"

export const App = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false)

  const [selectedCommands, setSelectedCommands] = useState<Command[]>(commands)

  const handleOnSave = (keyword: string): void => {
    const filteredCommands = commands.filter(
      (command) => command.command.indexOf(keyword) !== -1
    )

    setSelectedCommands(filteredCommands)
  }

  const onClosePalette = (): void => {
    setVisible(false)
  }

  const onExecuteCommand = (command: Command): void => {
    //TODO:Select a command to execute
    // console.log(command)
  }

  useEffect(() => {
    const $event = fromEvent(document, "keydown")
      .pipe(pluck("key"), bufferCount(2))
      .subscribe((keys) => {
        if (keys.join("") === "Metak") {
          setVisible(true)
        } else {
          onExecuteCommand(commandMap[keys.join("")])
        }
      })

    return () => {
      $event.unsubscribe()
    }
  }, [])

  return visible ? (
    <CommandPalette
      visible
      commands={selectedCommands}
      onSave={handleOnSave}
      onClosePalette={onClosePalette}
      onExecuteCommand={onExecuteCommand}
    />
  ) : null
}
