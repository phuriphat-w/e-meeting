import { AnnouncementRepository } from "./AnnouncementRepo"
import { MeetInfoRepository } from "./MeetInfoRepo"

const repositories = {
  announcements: new AnnouncementRepository(),
  userResults: new MeetInfoRepository()
}

export default repositories