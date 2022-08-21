import TopBar from './TopBar/TopBar'
import Search from './Search/Search'
import Messages from './Messages/Messages'
import './Layout.scss'
import ChatList from './ChatList/ChatList'
import AddContact from '../leftbars/AddContact/AddContact'
import {CSSTransition} from 'react-transition-group'
import { useState } from 'react'

function Layout({}) {
  const [isShowConcat, setIsShowContact] = useState<boolean>(false)

  return (
    <div className="Layout">
      <div className="Layout__left">
        <CSSTransition
          in={isShowConcat}
          timeout={500}
          classNames={{
            enter: 'contact__show',
            enterActive: 'contact__showing',
            exitActive: 'contact__exiting',
            exitDone: 'exited'
          }}
          mountOnEnter
          unmountOnExit
        >
          <AddContact setIsShowContact={setIsShowContact} />
        </CSSTransition>
        <TopBar setIsShowContact={setIsShowContact} />
        <Search />
        <ChatList />
      </div>
      <div className="Layout__right">
        <Messages />
      </div>
    </div>
  )
}

export default Layout