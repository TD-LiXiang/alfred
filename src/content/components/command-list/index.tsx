import { Avatar, List, Row, Col } from "antd"
import { Command } from "../../typings"

interface Props {
  commands: Command[]
  onExecuteCommand: (command: Command) => void
}

export const CommandList = (props: Props): JSX.Element => {
  const { commands, onExecuteCommand } = props

  const handelSelectCommand = (item: Command) => () => {
    if (typeof item === "function") {
      onExecuteCommand(item)
    }
  }

  return (
    <>
      {commands.length > 0 ? (
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "18px" }}
        >
          <Col>Commands</Col>
          <Col>Type shortcut Key to execute</Col>
        </Row>
      ) : null}

      <List
        size="small"
        itemLayout="horizontal"
        dataSource={commands}
        locale={{ emptyText: "no available command" }}
        renderItem={(item) => (
          <List.Item onClick={handelSelectCommand(item)}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item.command}
            />
            <div>{item.shortcutKey}</div>
          </List.Item>
        )}
      />
    </>
  )
}
