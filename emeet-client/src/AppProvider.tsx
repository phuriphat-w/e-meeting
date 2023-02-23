import { createContext, useContext, useState, useEffect} from 'react'
import { useAuth } from 'react-oidc-context';

function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}

export interface IAppCtx {
  userInfo: UserInfo
  action: {
    setUserInfo: (userInfo: UserInfo) => void
    isStaff: () => boolean,
    signOut: () => void,
  }
}

export const [useAppCtx, AppCtxProvider] = createCtx<IAppCtx>()

export type UserInfo = {
  ready: boolean
  username?: string
  displayName?: string
  groups?: string[]
  staff?: boolean
}

const initialUserInfo = {
  ready: false
}

export type AppProviderProps = {
  children: JSX.Element
}

function AppProvider({children}: AppProviderProps){
  const auth = useAuth()
  const [_userInfo, _setUserInfo] = useState<UserInfo>(initialUserInfo)

  useEffect(() => {
    const json = sessionStorage.getItem('userInfo') as string
    const data = JSON.parse(json)
    if(data){
        _setUserInfo({
            ready: data.ready,
            staff: data.staff
    })}
},[])


  function setUserInfo(userInfo: UserInfo){
    _setUserInfo({...userInfo, ready: true,staff:isStaff()})
    sessionStorage.setItem('userInfo',JSON.stringify(_userInfo))

  }

  function isStaff(){
    const groups:any = auth.user?.profile.groups
        return _userInfo.staff = groups.indexOf('staff') >= 0 ? true:false
}

  
  function signOut(){
    auth.signoutRedirect()    
    _setUserInfo({ready: false})
  }

  const appStore = {
    userInfo: _userInfo,
    action: {
      setUserInfo,
      isStaff,
      signOut,
    }
  }

  return (
    <AppCtxProvider value={appStore}>{children}</AppCtxProvider>
  )
}

export default AppProvider
