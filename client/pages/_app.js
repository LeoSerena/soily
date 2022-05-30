import { SocketContextProvider } from '../contexts/socketContext'
import { UserContextProvider } from '../contexts/userContext'

import '../styles/general.css'

import '../styles/Toolbar.css'

import '../styles/recentDiscussions.css'
import '../styles/chatbox.css'
import '../styles/myPageContainer.css'
import '../styles/discussion.css'
import '../styles/leftPanel.css'
import '../styles/discussionLink.css'
import '../styles/messages.css'

export default function App({ Component, pageProps }) {

    return (
      <SocketContextProvider>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </SocketContextProvider>)
}

