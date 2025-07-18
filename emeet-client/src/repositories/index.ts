import { MockAnnouncementRepository } from "./MockAnnouncementRepo"

const repositories = {
  announcements: new MockAnnouncementRepository(),
}

export default repositories