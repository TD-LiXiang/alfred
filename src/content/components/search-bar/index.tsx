import { Input } from "antd"
import type { ChangeEvent } from "react"
import { useEffect, useRef, startTransition } from "react"
import debounce from "lodash.debounce"

interface Props {
  onSave: (keywords: string) => void
}

const TIME_GAP = 500

export const SearchBar = (props: Props): JSX.Element => {
  const { onSave } = props

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current!.focus({
      cursor: "start",
    })
  }, [])

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    if (typeof onSave === "function") {
      startTransition(() => {
        onSave(e.target.value.trim())
      })
    }
  }, TIME_GAP)

  return (
    <Input
      ref={inputRef}
      placeholder="Search or jump to..."
      allowClear
      onChange={handleChange}
    />
  )
}
