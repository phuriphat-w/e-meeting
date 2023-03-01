import dbConnectionInfo from './db-conn.json'

const isProd = process.env.NODE_ENV == 'production'
let appConfig = {
  isProd,
  isDev: !isProd,
  clearDataBeforeLodingFixture: isProd ? false : true,
  dbConnectionInfo,
}

export default appConfig;