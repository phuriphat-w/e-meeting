import { AnnouncementRepository } from "./AnnouncementRepo"
import { MeetInfoRepository } from "./MeetInfoRepo"

const repositories = {
  announcements: new AnnouncementRepository(),
  meetInfo: new MeetInfoRepository()
}

export default repositories