import { IRepository } from "./IRepo";
import Announcement from "../models/Announcement";

export interface AnnouncementFilter {
  keyword?: string
}

// Mock data
const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    topic: 'การประชุมคณะกรรมการนักศึกษา ครั้งที่ 1/2567',
    meetDate: '15-03-2567',
    detail: 'ประชุมเพื่อพิจารณาเรื่องทุนการศึกษาและกิจกรรมนักศึกษา',
    place: 'ห้องประชุมคณะวิศวกรรมศาสตร์',
    agendaRule: '1/2567',
    pubDateTime: new Date('2024-03-10'),
    recognizeTime: new Date(),
    isMeetingEnd: false
  },
  {
    id: 2,
    topic: 'การประชุมคณะกรรมการวิชาการ ครั้งที่ 2/2567',
    meetDate: '20-03-2567',
    detail: 'ประชุมเพื่อพิจารณาหลักสูตรและการเรียนการสอน',
    place: 'ห้องประชุมใหญ่ ชั้น 3',
    agendaRule: '2/2567',
    pubDateTime: new Date('2024-03-15'),
    recognizeTime: new Date(),
    isMeetingEnd: false
  },
  {
    id: 3,
    topic: 'การประชุมคณะกรรมการบริหาร ครั้งที่ 1/2567',
    meetDate: '10-03-2567',
    detail: 'ประชุมเพื่อพิจารณางบประมาณและแผนงาน',
    place: 'ห้องประชุมคณบดี',
    agendaRule: '1/2567',
    pubDateTime: new Date('2024-03-05'),
    recognizeTime: new Date('2024-03-10T14:30:00'),
    isMeetingEnd: true
  },
  {
    id: 4,
    topic: 'การประชุมคณะกรรมการวิจัย ครั้งที่ 1/2567',
    meetDate: '25-03-2567',
    detail: 'ประชุมเพื่อพิจารณาโครงการวิจัยและงบสนับสนุน',
    place: 'Online via Zoom',
    agendaRule: '1/2567',
    pubDateTime: new Date('2024-03-18'),
    recognizeTime: new Date(),
    isMeetingEnd: false
  }
];

export class MockAnnouncementRepository implements IRepository<Announcement> {
  
  async getAll(filter: AnnouncementFilter): Promise<Announcement[] | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let results = [...mockAnnouncements];
    
    if (filter.keyword) {
      results = results.filter(ann => 
        ann.topic.toLowerCase().includes(filter.keyword!.toLowerCase()) ||
        ann.detail.toLowerCase().includes(filter.keyword!.toLowerCase())
      );
    }
    
    return results.sort((a, b) => b.id - a.id);
  }

  async get(id: string | number): Promise<Announcement | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const announcement = mockAnnouncements.find(ann => ann.id === Number(id));
    return announcement || null;
  }

  async create(entity: Partial<Announcement>): Promise<Announcement | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newId = Math.max(...mockAnnouncements.map(a => a.id)) + 1;
    const newAnnouncement: Announcement = {
      id: newId,
      topic: entity.topic || '',
      meetDate: entity.meetDate || '',
      detail: entity.detail || '',
      place: entity.place || '',
      agendaRule: entity.agendaRule || '',
      pubDateTime: new Date(),
      recognizeTime: new Date(),
      isMeetingEnd: false
    };
    
    mockAnnouncements.push(newAnnouncement);
    return newAnnouncement;
  }

  async update(entity: Partial<Announcement>): Promise<Announcement | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockAnnouncements.findIndex(ann => ann.id === entity.id);
    if (index === -1) return null;
    
    mockAnnouncements[index] = { ...mockAnnouncements[index], ...entity };
    return mockAnnouncements[index];
  }

  async delete(id: string | number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockAnnouncements.findIndex(ann => ann.id === Number(id));
    if (index !== -1) {
      mockAnnouncements.splice(index, 1);
    }
  }

  async read(id: string | number): Promise<Announcement | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockAnnouncements.findIndex(ann => ann.id === Number(id));
    if (index === -1) return null;
    
    mockAnnouncements[index].recognizeTime = new Date();
    return mockAnnouncements[index];
  }

  async MeetingEnd(id: string | number, meetingEnd: boolean): Promise<Announcement | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockAnnouncements.findIndex(ann => ann.id === Number(id));
    if (index === -1) return null;
    
    mockAnnouncements[index].isMeetingEnd = meetingEnd;
    if (meetingEnd) {
      mockAnnouncements[index].recognizeTime = new Date();
    }
    
    return mockAnnouncements[index];
  }
}