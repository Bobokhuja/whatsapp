import TopBar from './TopBar/TopBar'
import Search from './Search/Search'
import Messages from './Messages/Messages'
import './Layout.scss'
import ChatList from './ChatList/ChatList'

function Layout({}) {
  return (
    <div className="Layout">
      <div className="Layout__left">
        <TopBar />
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