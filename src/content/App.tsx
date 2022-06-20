import { CommandPalette } from "./components/command-palette"
import { useEffect, useState } from "react"
import { commandMap } from "./models/commands"

import { fromEvent } from "rxjs"
import { pluck, bufferCount } from "rxjs/operators"

import type Instant from "./types/Instant"

import { instants } from "./models/instants"

export const App = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false)

  const [filterInstants, setFilterInstants] = useState<Instant[]>([])

  const [keyword, setKeyword] = useState("")

  const handleOnSave = (keyword: string): void => {
    setKeyword(keyword)
    const filterInstants = instants.filter(
      (instant) => instant.title.indexOf(keyword) !== -1
    )
    setFilterInstants(filterInstants)
  }

  const onClosePalette = (): void => {
    setVisible(false)
  }

  const onExecuteInstant = (instant: Instant): void => {
    window.open(`https://support.talkdesk.com/${instant.url}`)
  }

  useEffect(() => {
    setFilterInstants(instants)

    const $event = fromEvent(document, "keydown")
      .pipe(pluck("key"), bufferCount(2))
      .subscribe((keys) => {
        if (keys.join("") === "Metak") {
          setVisible(true)
        } else {
          onExecuteInstant(commandMap[keys.join("")])
        }
      })

    return () => {
      $event.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const iframes = document.querySelectorAll("iframe")
    const iframeConversation = iframes.find(
      (iframe) => iframe.dateset.testid === "iframe-conversation"
    )

    iframeConversation.onload = () => {
      iframeConversation.contentWindow.postMessage("new email", "*")
    }
  }, [])

  return visible ? (
    <CommandPalette
      visible
      keyword={keyword}
      instants={filterInstants}
      onSave={handleOnSave}
      onClosePalette={onClosePalette}
      onExecuteInstant={onExecuteInstant}
    />
  ) : null
}
