import React, { Fragment } from 'react'

const TrackCard = ({ track, handleChange }) => {
    return (
        <div>
            <Fragment key={track.id}>
                <img src={track.cover} alt="cover" />
                <div className="answer-area">
                    <label htmlFor={track.title}>
                        <input
                            type="radio"
                            id={track.title}
                            name='choices'
                            value={track.title}
                            onChange={handleChange} />
                        {track.title}
                    </label>
                </div>
            </Fragment>
        </div>
    )
}

export default TrackCard
