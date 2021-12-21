// Un bouton apparaît ensuite pour proposer une nouvelle partie.

import React from 'react'

const NewGameButton = () => {
    return (
        <div>
            <button onClick={() => window.location.reload(false)}>
                Let's play again!
            </button>
        </div>
    )
}

export default NewGameButton

