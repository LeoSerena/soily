import { SocketContextProvider } from '../contexts/socketContext'
import { UserContextProvider } from '../contexts/userContext'

import '../styles/rightHeader.css'
import '../styles/messages.css'
import '../styles/Toolbar.css'
import '../styles/recentDiscussions.css'
import '../styles/registerLogin.css'
import '../styles/userComponent.css'
import '../styles/chatbox.css'
import '../styles/myPageContainer.css'
import '../styles/discussion.css'


export default function App({ Component, pageProps }) {

    return (
      <SocketContextProvider>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </SocketContextProvider>)
}

