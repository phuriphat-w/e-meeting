import Koa from 'koa'
import Router from 'koa-router'
import db from '../db'
import { nestObject } from './utils'

const router = new Router()

const makeQuery = () => db('announcement').select('*')
const findById = (id: number) => makeQuery().where({id})

const updateAnouncement = (id:number, data:any) => {
  return db('announcement').where({id}).update(data)
}

const prepareAnnoucementById = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const id = parseInt(ctx.params.id)
  const announcement = await findById(id).first()
  if(!announcement){
    ctx.response.status = 404
    return
  }
  ctx.state.announcement = announcement
  await next()
}

router
  .get('/', async (ctx, next) => {            
    let query = makeQuery()
    if (ctx.request.query['keyword']) {
      const keyword = String(ctx.request.query['keyword'])
      query = query.where((it) => {it.where('topic', 'like', `%${keyword}%`)})
    }
    ctx.body = await query.orderBy('id', 'desc')
  })
  .get('/:id', prepareAnnoucementById, async (ctx, next) => {    
    ctx.body = ctx.state.announcement
  })
  .post('/', async (ctx, next) => {    
    const id = (await db('announcement').insert({...ctx.request.body, pubDateTime: new Date()}))[0]
    ctx.body = await findById(id).first()
  })
  .put('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    delete ctx.request.body.id
    const rowUpdated = await findById(id).update(ctx.request.body)
    if(rowUpdated == 0){
      ctx.response.status = 404
      return
    }
    ctx.body = await findById(id).first()
  })
  .del('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const rowUpdated = await findById(id).del()
    ctx.body = {statusCode: rowUpdated > 0 ? 1 : 0}
  })

  .get('/:id/Read', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const recognizeTime = new Date()
    const rowUpdated = await updateAnouncement(id, { recognizeTime })
    if(rowUpdated == 0){
        ctx.response.status = 404
        return
    }
    const announcement = await findById(id)
    const result = announcement.map(it => nestObject(it,'announcement'))
    ctx.body = result[0]

  })

  .get('/:id/meetingEnd/:value', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const isMeetingEnd = ctx.params.value == '1'
    const rowUpdated = await updateAnouncement(id, { isMeetingEnd })
    if(rowUpdated == 0){
        ctx.response.status = 404
        return
    }
    const announcement = await findById(id)
    const result = announcement.map(it => nestObject(it,'announcement'))
    ctx.body = result[0]

  })

export default router