import { ax } from '../config';
import { IRepository } from "./IRepo";
import MeetInfo from "../models/MeetInfo";
import config from "../config";

export interface MeetInfoFilter {
  keyword?: string
}

export class MeetInfoRepository implements IRepository<MeetInfo> {
  urlPrefix = config.remoteRepositoryUrlPrefix

  async getAll(filter: MeetInfoFilter): Promise<MeetInfo[] | null> {
    const params = {...filter}
    const resp = await ax.get<MeetInfo[]>(`${this.urlPrefix}/meet`, { params })
    return resp.data
  }

  async get(id: string|number): Promise<MeetInfo | null> {
    const resp = await ax.get<MeetInfo>(`${this.urlPrefix}/meet/${id}`)
    return resp.data
  }

  async create(entity: Partial<MeetInfo>): Promise<MeetInfo | null> {
    const resp = await ax.post<MeetInfo>(`${this.urlPrefix}/meet`, entity)
    return resp.data
  }

  async update(entity: Partial<MeetInfo>): Promise<MeetInfo | null> {
    const resp = await ax.put<MeetInfo>(`${this.urlPrefix}/meet/${entity.id}`, entity)
    return resp.data
  }

  async delete(id: string|number): Promise<void> {
    await ax.delete<void>(`${this.urlPrefix}/meet/${id}`)
  }
}