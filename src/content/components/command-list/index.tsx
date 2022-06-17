import {  List } from "antd"
import { useCallback, useEffect, useState } from "react"
import { bufferCount, fromEvent, pluck } from "rxjs"
import Instant from "../../models/Instant"
import { isFunction } from "../../utils"

import "./index.css"
interface Props {
  instants: Instant[]
  keyword:string
  onExecuteInstant: (Instant: Instant) => void
}

export const InstantList = (props: Props): JSX.Element => {
  const { instants,keyword, onExecuteInstant } = props

  const [selectInstant,setSeletInstant]=useState<Instant>(null)

  const handelCommitInstant = (item: Instant) =>()=>{
    if (item&&isFunction(onExecuteInstant)) {
      onExecuteInstant(item)
    }
  }

  const handelEnterInstant = useCallback(()=> {
    if (selectInstant&&isFunction(onExecuteInstant)) {
      onExecuteInstant(selectInstant)
    }
  },[onExecuteInstant, selectInstant])

  const handelSelectInstant=(item:Instant)=>()=>{
    setSeletInstant(item)
  }

  useEffect(() => {
    const $event = fromEvent(document, "keydown")
      .pipe(pluck("key"), bufferCount(1))
      .subscribe((keys) => {
        if (keys.join("") === "ArrowDown") {
          if(selectInstant){
            const selIndex=instants.findIndex((item)=>selectInstant===item)
            if(selIndex<instants.length-1){
              setSeletInstant(instants[selIndex+1])
            }
          }
        } else if(keys.join("") === "ArrowUp"){
          if(selectInstant){
            const selIndex=instants.findIndex((item)=>selectInstant===item)
            if(selIndex>0){
              setSeletInstant(instants[selIndex-1])
            }
          }
        }else if(keys.join("") ==="Enter"){
          if(selectInstant){
            handelEnterInstant()
          }
        }
      })

    return () => {
      $event.unsubscribe()
    }
  }, [ handelEnterInstant, instants, selectInstant])

  const formatTitle=(title)=>{
    return title.replace(new RegExp(keyword,'i'),`<span style="color:red">${keyword}</span>`)
  }

  return (
    <>
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={instants}
        locale={{ emptyText: "no available command" }}
        renderItem={(item) => (
          <List.Item onClick={handelSelectInstant(item)}  onDoubleClick={handelCommitInstant(item)} style={selectInstant===item?{backgroundColor: 'rgba(0, 0, 0, 0.04)'}:{}}>
            <List.Item.Meta
              title={<span dangerouslySetInnerHTML={{__html: formatTitle(item.title)}} ></span>}
              description={item.section_or_topic}
            />
          </List.Item>
        )}
      />
    </>
  )
}
