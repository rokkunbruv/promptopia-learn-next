import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'
import Loader from '@components/Loader'

export const metadata = {
    title: "Promptopia",
    description: 'Discover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Loader>
          <Provider>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app">
              <Nav />
              {children}
            </main>
          </Provider>
        </Loader>
      </body>
    </html>
  )
}

export default RootLayout
