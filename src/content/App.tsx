import { CommandPalette } from "./components/command-palette"
import { useCallback, useEffect, useState } from "react"
import { commands } from "./models/commands"
import { Command } from "./typings"

const KEY_K = "k"

export const App = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false)

  const [selectedCommands, setSelectedCommands] = useState<Command[]>(commands)

  const displaySearchBar = useCallback((e: KeyboardEvent): void => {
    if (e.metaKey && e.key === KEY_K) {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", displaySearchBar)

    return () => {
      document.removeEventListener("keydown", displaySearchBar)
    }
  }, [displaySearchBar])

  const handleOnSave = (keyword: string): void => {
    const filteredCommands = commands.filter(
      (command) => command.command.indexOf(keyword) !== -1
    )

    setSelectedCommands(filteredCommands)
  }

  const onClosePalette = () => {
    setVisible(false)
  }

  const onExecuteCommand = (command: Command) => {
    //TODO:Select a command to execute
    console.log(command)
  }

  return (
    <>
      {visible ? (
        <CommandPalette
          visible
          commands={selectedCommands}
          onSave={handleOnSave}
          onClosePalette={onClosePalette}
          onExecuteCommand={onExecuteCommand}
        />
      ) : null}
    </>
  )
}
