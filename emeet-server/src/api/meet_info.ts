import { AuthData } from '../auth'
import Router from 'koa-router'
import db from '../db'
import { nestObject } from './utils'
const router = new Router()

const makeQuery = () => db('meetinfo').select(
  'meetinfo.*',
  'announcement.topic as announcementTopic',
  'announcement.meetDate as announcementmeetDate',
  'announcement.detail as announcementdetail',
  'announcement.pubDateTime as announcementPubDateTime'
).leftJoin('announcement', 'meetinfo.announcementId', 'announcement.id')

router
  .get('/', async (ctx, next) => {
    const authData = ctx.state.authData as AuthData
    let query = makeQuery().where({ 'meetinfo.userCode': authData.username })
    if (ctx.request.query['announcementId']) {
      const announcementId = Number(ctx.request.query['announcementId'])
      query = query.where({ announcementId })
    }
    if (ctx.request.query['keyword']) {
      const keyword = String(ctx.request.query['keyword'])
      query = query.where((it) => {it.where('announcement.topic', 'like', `%${keyword}%`)})
    }
    if (ctx.request.query['keyword']) {
      const keyword = String(ctx.request.query['keyword'])
      query = query.where((it) => {it.where('announcement.detail', 'like', `%${keyword}%`)})
    }
    const meetinfos = await query.orderBy('id')
    ctx.body = meetinfos.map(it => nestObject(it, 'announcement'))
  })

export default router