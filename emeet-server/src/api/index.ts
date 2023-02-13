import { authMiddleware } from '../auth'
import Router from 'koa-router'
import announcement from './announcement'
import meet_info from './meet_info'

const apiRouter = new Router()

apiRouter.use('/api/announcement', authMiddleware, announcement.routes())
apiRouter.use('/api/meet', authMiddleware, meet_info.routes())

export default apiRouter