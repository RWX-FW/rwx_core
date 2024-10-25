import React, { useState } from 'react'
import { fetchNui } from './utils/fetchNui'
import RegisterLayout from './layouts/Register'
import Multicharacter from './layouts/Multicharacter'
import { PlayerDataProps } from './types/playerdata'
import { useNuiEvent } from './hooks/useNuiEvent'
import { debugData } from './utils/debugData'

debugData([
    {
        action: 'setPlayerData',
        data: [
            {
                firstname: 'Test',
                lastname: 'Test',
                identifier: 'Test',
                job: 'Test',
                bank: 100,
                cash: 100
            },
            {
                firstname: 'John',
                lastname: 'Test',
                identifier: 'Test',
                job: 'Test',
                bank: 100,                
                cash: 100
            }
        ]
    },
])

debugData([
    {
        action: 'setVisible',
        data: true
    }
])

const App = () => {
    const [visible, setVisible] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const [playerData, setPlayerData] = useState<PlayerDataProps[]>([])

    useNuiEvent('setVisible', (data: boolean) => {
        setVisible(data)
    })

    fetchNui<boolean>('appReady').then((res) => {
        setVisible(res)
    })

    useNuiEvent('setPlayerData', (data: PlayerDataProps[]) => {
        setPlayerData(data)
    })

  return (
    visible && (
        <div className='w-screen h-screen flex dark text-foreground items-center bg-card/20 justify-between flex-row-reverse'>
            <Multicharacter setShowRegister={setShowRegister} showRegister={showRegister} playerData={playerData}/>
            {showRegister && <RegisterLayout setShowRegister={setShowRegister}/>}
        </div>
    )
        
  )
}

export default App