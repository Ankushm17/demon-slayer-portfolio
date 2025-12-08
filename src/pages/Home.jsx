import React from 'react'
import Runner from '../components/Runner'
import ChatBox from '../components/ChatBox'


const Home = () => {
  return (
    <main className="min-h-screen relative">

        <Runner />

      {/* page content */}
      <div className="container mx-auto px-8 py-24 relative z-10">
        <p className="font-terminal text-xl text-white/80 max-w-2xl">
          Welcome to my portfolio website!
        </p>

        <div className='chat-position'>
            <div className='mt-12'>
                <ChatBox />
            </div>
        </div>
        
        
      </div>

    </main>
  )
}

export default Home
