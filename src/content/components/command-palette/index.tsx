import { Modal } from "antd"
import { SearchBar } from "../search-bar"
import { InstantList } from "../command-list"
import Instant from "../../models/Instant"

interface Props {
  visible: boolean
  instants: Instant[]
  keyword:string
  onSave: (keywords: string) => void
  onClosePalette: () => void
  onExecuteInstant: (instant: Instant) => void
}

export const CommandPalette = (props: Props): JSX.Element => {
  const { visible, instants,keyword, onSave, onClosePalette, onExecuteInstant: onExecuteCommand } = props

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
      <InstantList keyword={keyword} instants={instants} onExecuteInstant={onExecuteCommand} />
    </Modal>
  )
}
