import { Input } from "antd"
import type { ChangeEvent } from "react"
import { startTransition } from "react"
import debounce from "lodash.debounce"
import { isFunction } from "../../utils"
import { DEBOUNCE_TIME } from "../../constants"

interface Props {
  onSave: (keyword: string) => void
}

export const SearchBar = (props: Props): JSX.Element => {
  const { onSave } = props

  // const inputRef = useRef(null)

  //TODO:default not focus
  // useEffect(() => {
  //   inputRef.current!.focus({
  //     cursor: "start",
  //   })
  // }, [])

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>): void => {
    if (isFunction(onSave)) {
      startTransition((): void => {
        onSave(e.target.value.trim())
      })
    }
  }, DEBOUNCE_TIME)

  return (
    <Input
      // ref={inputRef}
      placeholder="Search or jump to..."
      allowClear
      onChange={handleChange}
    />
  )
}
