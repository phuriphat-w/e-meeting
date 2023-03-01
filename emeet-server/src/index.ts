import Koa from 'koa'
import { koaBody } from 'koa-body'
import cors from '@koa/cors'
import loadFixtures from './fixture'
import apiRouter from './api'
import appConfig from './config'

const app = new Koa()

app.use(cors());
app.use(koaBody());

app.use(apiRouter.routes());

(async () => {
  await loadFixtures(appConfig.clearDataBeforeLodingFixture)
  app.listen(8000)
  console.log('Server is ready at port 8000')
})();