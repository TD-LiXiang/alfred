import { Modal } from "antd"
import { SearchBar } from "../search-bar"
import { CommandList } from "../command-list"
import { Command } from "../../typings"

interface Props {
  visible: boolean
  commands: Command[]
  onSave: (keywords: string) => void
  onClosePalette: () => void
  onExecuteCommand: (command: Command) => void
}

export const CommandPalette = (props: Props): JSX.Element => {
  const { visible, commands, onSave, onClosePalette, onExecuteCommand } = props

  return (
    <Modal
      bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 400px)" }}
      title={<SearchBar onSave={onSave} />}
      visible={visible}
      footer={null}
      onCancel={onClosePalette}
      closable={false}
      mask={false}
    >
      <CommandList commands={commands} onExecuteCommand={onExecuteCommand} />
    </Modal>
  )
}
