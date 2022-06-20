import { List } from "antd"
import { useCallback, useEffect, useState } from "react"
import { bufferCount, fromEvent, pluck } from "rxjs"
import type Instant from "../../types/Instant"
import { isFunction } from "../../utils"

import styles from "./index.module.scss"

interface Props {
  instants: Instant[]
  keyword: string
  onExecuteInstant: (Instant: Instant) => void
}

const formatTitle = (title: string, keyword: string): string => {
  if (!keyword) return title

  return title.replace(
    new RegExp(keyword, "i"),
    `<span style="color:red">${keyword}</span>`
  )
}

export const InstantList = (props: Props): JSX.Element => {
  const { instants, keyword, onExecuteInstant } = props

  const [selectInstant, setSelectInstant] = useState<Instant>(null)

  const doubleClickTriggerInstant =
    (item: Instant): (() => void) =>
    (): void => {
      if (item && isFunction(onExecuteInstant)) {
        onExecuteInstant(item)
      }
    }

  const handelEnterInstant = useCallback((): void => {
    if (selectInstant && isFunction(onExecuteInstant)) {
      onExecuteInstant(selectInstant)
    }
  }, [onExecuteInstant, selectInstant])

  const handelSelectInstant =
    (item: Instant): (() => void) =>
    () => {
      setSelectInstant(item)
    }

  useEffect(() => {
    const $event = fromEvent(document, "keydown")
      .pipe(pluck("key"), bufferCount(1))
      .subscribe((keys) => {
        if (keys.join("") === "ArrowDown") {
          if (selectInstant) {
            const selIndex = instants.findIndex(
              (item) => selectInstant.title === item.title
            )
            if (selIndex < instants.length - 1) {
              setSelectInstant(instants[selIndex + 1])
            }
          }
        } else if (keys.join("") === "ArrowUp") {
          if (selectInstant) {
            const selIndex = instants.findIndex(
              (item) => selectInstant.title === item.title
            )
            if (selIndex > 0) {
              setSelectInstant(instants[selIndex - 1])
            }
          }
        } else if (keys.join("") === "Enter") {
          if (selectInstant) {
            handelEnterInstant()
          }
        }
      })

    return () => {
      $event.unsubscribe()
    }
  }, [handelEnterInstant, instants, selectInstant])

  return (
    <>
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={instants}
        locale={{ emptyText: "no available command" }}
        renderItem={(item) => (
          <List.Item
            className={styles.itemHover}
            onClick={handelSelectInstant(item)}
            onDoubleClick={doubleClickTriggerInstant(item)}
            style={
              selectInstant.title === item.title
                ? { backgroundColor: "rgba(0, 0, 0, 0.04)" }
                : {}
            }
          >
            <List.Item.Meta
              title={
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatTitle(item.title, keyword),
                  }}
                ></span>
              }
              description={item.section_or_topic}
            />
          </List.Item>
        )}
      />
    </>
  )
}
