import React, { Fragment } from 'react'


const RandomTrackPreview = ({ track }) => {


    return (
        <Fragment>
            <figure>
                <audio
                    controls
                    src={track.preview}
                    title={track.title}
                >
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </figure>
        </Fragment>
    )
}

export default RandomTrackPreview
