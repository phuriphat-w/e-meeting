import Announcement from "./Announcement"

export default interface MeetInfo{
  id: number
  announcement: Partial<Announcement>
  place: string
  agendaRule: string
  userCode: string
  _updated?: boolean
  _deleted?: boolean
}