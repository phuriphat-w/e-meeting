import { AuthData } from '../auth'
import Router from 'koa-router'
import db from '../db'
import { nestObject } from './utils'
const router = new Router()

const makeQuery = () => db('meet_info').select(
  'meet_info.*',
  'announcement.topic as announcementTopic',
  'announcement.pubDateTime as announcementPubDateTime'
).leftJoin('announcement', 'meet_info.announcementId', 'announcement.id')

const updateUserResult = (id: number, userCode: string, data: any) => {
  return db('meet_info').where({ id, userCode }).update(data)
}

router
  .get('/', async (ctx, next) => {
    const authData = ctx.state.authData as AuthData
    let query = makeQuery().where({ 'meet_info.userCode': authData.username })
    if (ctx.request.query['announcementId']) {
      const announcementId = Number(ctx.request.query['announcementId'])
      query = query.where({ announcementId })
    }
    if (ctx.request.query['keyword']) {
      const keyword = String(ctx.request.query['keyword'])
      query = query.where((it) => {it.where('announcement.topic', 'like', `%${keyword}%`)})
    }
    const userResults = await query.orderBy('id')
    ctx.body = userResults.map(it => nestObject(it, 'announcement'))
  })
  .get('/:id/markAsViewed', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const authData = ctx.state.authData as AuthData
    const viewDateTime = new Date()
    const rowUpdated = await updateUserResult(id, authData.username, { viewDateTime })
    if(rowUpdated == 0){
      ctx.response.status = 404
      return
    }
    ctx.body = {statusCode: 1, viewDateTime}
  })
  .get('/:id/acknowledge', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const authData = ctx.state.authData as AuthData
    const ackDateTime = new Date()
    const rowUpdated = await updateUserResult(id, authData.username, { ackDateTime })
    if(rowUpdated == 0){
      ctx.response.status = 404
      return
    }
    ctx.body = {statusCode: 1, ackDateTime}
  })

export default router