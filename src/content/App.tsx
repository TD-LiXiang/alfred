import { CommandPalette } from "./components/command-palette"
import { useEffect, useState } from "react"
import { commandMap } from "./models/commands"

import { fromEvent } from "rxjs"
import { pluck, bufferCount } from "rxjs/operators"

import Instant from "./models/Instant"

const instants=[
  {
      "title":"Email notifications for voicemails",
      "section_or_topic":"Managing Voicemail Settings in Talkdesk Classic",
      "parent_title":"Using Talkdesk",
      "help_center":"Knowledge Base",
      "url":"/hc/search/instant_click?data=BAh7CzoHaWRpBF%2FfHQw6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiYGh0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMjAzMjg0MzE5LUVtYWlsLW5vdGlmaWNhdGlvbnMtZm9yLXZvaWNlbWFpbHMGOwdUOg5zZWFyY2hfaWRJIikyNzM3ODE4Ni0zZjYxLTQyZDUtOTYwMS1iNzljN2U2OTA3NTMGOwdGOglyYW5raQY6C2xvY2FsZUkiCmVuLXVzBjsHVA%3D%3D--deaca8d81786bcda075971f88846acfb1ce19fa1",
      "date":"2021-11-18T12:06:48Z",
      "type":"article",
      "multibrand":true
  },
  {
      "title":"Email Notifications for Missed Calls",
      "section_or_topic":"Automated Tasks",
      "parent_title":"Integrations & Connections",
      "help_center":"Knowledge Base",
      "url":"/hc/search/instant_click?data=BAh7CzoHaWRpBLu7%2Bgs6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiYmh0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMjAwOTgxNDM1LUVtYWlsLU5vdGlmaWNhdGlvbnMtZm9yLU1pc3NlZC1DYWxscwY7B1Q6DnNlYXJjaF9pZEkiKTI3Mzc4MTg2LTNmNjEtNDJkNS05NjAxLWI3OWM3ZTY5MDc1MwY7B0Y6CXJhbmtpBzoLbG9jYWxlSSIKZW4tdXMGOwdU--7fd911e1fc3e33e3d353c042429851809e641171",
      "date":"2020-02-11T20:38:37Z",
      "type":"article",
      "multibrand":true
  },
  {
      "title":"Talkdesk Digital Engagement: Email Channel Overview",
      "section_or_topic":"Talkdesk Digital Engagement",
      "parent_title":"Talkdesk CX Cloud",
      "help_center":"Knowledge Base",
      "url":"/hc/search/instant_click?data=BAh7CzoHaWRsKwgbINhLBAQ6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkidGh0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvNDQxNjQ5ODgzNTQ4My1UYWxrZGVzay1EaWdpdGFsLUVuZ2FnZW1lbnQtRW1haWwtQ2hhbm5lbC1PdmVydmlldwY7B1Q6DnNlYXJjaF9pZEkiKTI3Mzc4MTg2LTNmNjEtNDJkNS05NjAxLWI3OWM3ZTY5MDc1MwY7B0Y6CXJhbmtpCDoLbG9jYWxlSSIKZW4tdXMGOwdU--62d2fc9e2f11303c24992ce488a8cb6caeb26d5a",
      "date":"2022-06-06T17:22:45Z",
      "type":"article",
      "multibrand":true
  },
  {
      "title":"Talkdesk Digital Engagement: Configuring the Email Channel",
      "section_or_topic":"Talkdesk Digital Engagement",
      "parent_title":"Talkdesk CX Cloud",
      "help_center":"Knowledge Base",
      "url":"/hc/search/instant_click?data=BAh7CzoHaWRsKwibH8RlBAQ6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkie2h0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvNDQxNjkzMzczMjI1MS1UYWxrZGVzay1EaWdpdGFsLUVuZ2FnZW1lbnQtQ29uZmlndXJpbmctdGhlLUVtYWlsLUNoYW5uZWwGOwdUOg5zZWFyY2hfaWRJIikyNzM3ODE4Ni0zZjYxLTQyZDUtOTYwMS1iNzljN2U2OTA3NTMGOwdGOglyYW5raQk6C2xvY2FsZUkiCmVuLXVzBjsHVA%3D%3D--90875f7de12f46868c1cc0a6ddcb8f5c3e352ffe",
      "date":"2022-06-06T11:31:24Z",
      "type":"article",
      "multibrand":true
  },
  {
      "title":"Can I change the email address of a user?",
      "section_or_topic":"FAQ - Configuring Talkdesk",
      "parent_title":"Using Talkdesk",
      "help_center":"Knowledge Base",
      "url":"/hc/search/instant_click?data=BAh7CzoHaWRpBAHs%2FAs6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiZ2h0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMjAxMTI0ODY1LUNhbi1JLWNoYW5nZS10aGUtZW1haWwtYWRkcmVzcy1vZi1hLXVzZXItBjsHVDoOc2VhcmNoX2lkSSIpMjczNzgxODYtM2Y2MS00MmQ1LTk2MDEtYjc5YzdlNjkwNzUzBjsHRjoJcmFua2kKOgtsb2NhbGVJIgplbi11cwY7B1Q%3D--87505146afa4e18dfbd9283c7be6edad34971e1f",
      "date":"2022-02-25T19:53:03Z",
      "type":"article",
      "multibrand":true
  },
  {
      "title":"How do I turn off the Missed Call or Voicemail notification emails?",
      "section_or_topic":"FAQ - Integrations ",
      "parent_title":"Integrations & Connections",
      "help_center":"Knowledge Base",
      "url":"/hc/search/instant_click?data=BAh7CzoHaWRpBI%2B%2F%2Bgs6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiAXxodHRwczovL3N1cHBvcnQudGFsa2Rlc2suY29tL2hjL2VuLXVzL2FydGljbGVzLzIwMDk4MjQxNS1Ib3ctZG8tSS10dXJuLW9mZi10aGUtTWlzc2VkLUNhbGwtb3ItVm9pY2VtYWlsLW5vdGlmaWNhdGlvbi1lbWFpbHMtBjsHVDoOc2VhcmNoX2lkSSIpMjczNzgxODYtM2Y2MS00MmQ1LTk2MDEtYjc5YzdlNjkwNzUzBjsHRjoJcmFua2kLOgtsb2NhbGVJIgplbi11cwY7B1Q%3D--134b1930d115f987da47a5354c8b12b729f19a55",
      "date":"2021-12-23T15:43:50Z",
      "type":"article",
      "multibrand":true
  },  {
    "title":"Agent to Agent calls (Legacy)",
    "section_or_topic":"Making Calls",
    "parent_title":"Using Talkdesk",
    "help_center":"Knowledge Base",
    "url":"/hc/search/instant_click?data=BAh7CzoHaWRpBJ2DIww6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiWmh0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMjAzNjU0MDQ1LUFnZW50LXRvLUFnZW50LWNhbGxzLUxlZ2FjeS0GOwdUOg5zZWFyY2hfaWRJIikxM2MyNmVmYS05MWYxLTRkNzAtYTk5ZS1iMjg4MWEzZGQ4ZGIGOwdGOglyYW5raQY6C2xvY2FsZUkiCmVuLXVzBjsHVA%3D%3D--14aa40114bbf0be14a54893622fc3275aaf2078b",
    "date":"2022-02-25T18:02:50Z",
    "type":"article",
    "multibrand":true
},
{
    "title":"WFM for Agents",
    "section_or_topic":"Talkdesk Workforce Management",
    "parent_title":"Talkdesk CX Cloud",
    "help_center":"Knowledge Base",
    "url":"/hc/search/instant_click?data=BAh7CzoHaWRsKwgIr0rUUwA6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiT2h0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMzYwMDQzOTQ5ODMyLVdGTS1mb3ItQWdlbnRzBjsHVDoOc2VhcmNoX2lkSSIpMTNjMjZlZmEtOTFmMS00ZDcwLWE5OWUtYjI4ODFhM2RkOGRiBjsHRjoJcmFua2kHOgtsb2NhbGVJIgplbi11cwY7B1Q%3D--10a899863363613039f017a448642dcc6bd12fbb",
    "date":"2022-06-06T15:17:51Z",
    "type":"article",
    "multibrand":true
},
{
    "title":"Agents and Licenses",
    "section_or_topic":"Agents and Licenses",
    "parent_title":"Billing",
    "help_center":"Knowledge Base",
    "url":"/hc/search/instant_click?data=BAh7CzoHaWRpBJXPUAw6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiUWh0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMjA2NjIyNjEzLUFnZW50cy1hbmQtTGljZW5zZXMGOwdUOg5zZWFyY2hfaWRJIikxM2MyNmVmYS05MWYxLTRkNzAtYTk5ZS1iMjg4MWEzZGQ4ZGIGOwdGOglyYW5raQg6C2xvY2FsZUkiCmVuLXVzBjsHVA%3D%3D--9a11bf7988f39183340b67367546a2130a408387",
    "date":"2022-03-17T17:33:58Z",
    "type":"article",
    "multibrand":true
},
{
    "title":"Agent Deactivation",
    "section_or_topic":"Agents & Teams",
    "parent_title":"Configuring Talkdesk",
    "help_center":"Knowledge Base",
    "url":"/hc/search/instant_click?data=BAh7CzoHaWRpBHomWQw6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiUGh0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMjA3MTY5MTQ2LUFnZW50LURlYWN0aXZhdGlvbgY7B1Q6DnNlYXJjaF9pZEkiKTEzYzI2ZWZhLTkxZjEtNGQ3MC1hOTllLWIyODgxYTNkZDhkYgY7B0Y6CXJhbmtpCToLbG9jYWxlSSIKZW4tdXMGOwdU--68446de4020c4a2f0d7208ce3e45e9a4ab04dd8f",
    "date":"2022-03-10T21:01:56Z",
    "type":"article",
    "multibrand":true
},
{
    "title":"Live Agents List",
    "section_or_topic":"Talkdesk Live ",
    "parent_title":"Monitoring & Reporting",
    "help_center":"Knowledge Base",
    "url":"/hc/search/instant_click?data=BAh7CzoHaWRsKwgbhgOxAgQ6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiUmh0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvNDQwOTYwNjI0Mzg2Ny1MaXZlLUFnZW50cy1MaXN0BjsHVDoOc2VhcmNoX2lkSSIpMTNjMjZlZmEtOTFmMS00ZDcwLWE5OWUtYjI4ODFhM2RkOGRiBjsHRjoJcmFua2kKOgtsb2NhbGVJIgplbi11cwY7B1Q%3D--a4324b21bb81961f3a6ef4f9e25889efcabc32f3",
    "date":"2022-03-03T17:57:04Z",
    "type":"article",
    "multibrand":true
},
{
    "title":"Full and Flex Agents (Legacy)",
    "section_or_topic":"Agents and Licenses",
    "parent_title":"Billing",
    "help_center":"Knowledge Base",
    "url":"/hc/search/instant_click?data=BAh7CzoHaWRpBPhWSww6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiWmh0dHBzOi8vc3VwcG9ydC50YWxrZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMjA2MjY0MDU2LUZ1bGwtYW5kLUZsZXgtQWdlbnRzLUxlZ2FjeS0GOwdUOg5zZWFyY2hfaWRJIikxM2MyNmVmYS05MWYxLTRkNzAtYTk5ZS1iMjg4MWEzZGQ4ZGIGOwdGOglyYW5raQs6C2xvY2FsZUkiCmVuLXVzBjsHVA%3D%3D--5808bef7a287924d6e6531becb334a1f42fdd21a",
    "date":"2022-03-15T12:50:33Z",
    "type":"article",
    "multibrand":true
}
]
export const App = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false)

  const [filterInstants,setFilterInstants]=useState<Instant[]>([])

  const handleOnSave = (keyword: string): void => {
    const filterInstants=instants.filter(
      (instant) => (instant.title.indexOf(keyword)!==-1)
    )
    setFilterInstants( filterInstants)
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

  return visible ? (
    <CommandPalette
      visible
      commands={filterInstants}
      onSave={handleOnSave}
      onClosePalette={onClosePalette}
      onExecuteInstant={onExecuteInstant}
    />
  ) : null
}
