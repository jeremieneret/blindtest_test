import React from 'react'
import DisplayResult from '../components/DisplayResult';
import NewGameButton from '../components/NewGameButton';
import RandomTrackPreview from '../components/RandomTrackPreview';
import ThreeChoices from '../components/ThreeChoices';


const Blindtest = () => {
    return (
        <div>
            <h1>
                BLINDTEST!
            </h1>
            <RandomTrackPreview />
            <ThreeChoices />
            <DisplayResult />
            <NewGameButton />
        </div>
    )
}

export default Blindtest
