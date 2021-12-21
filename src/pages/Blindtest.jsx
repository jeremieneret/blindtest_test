import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import DisplayResult from '../components/DisplayResult';
import NewGameButton from '../components/NewGameButton';
import RandomTrackPreview from '../components/RandomTrackPreview';
import TrackCard from '../components/TrackCard';
import { randomInteger } from '../functions/randomInteger';

const Blindtest = () => {
    const randomId = randomInteger(0, 9);
    const randomId2 = randomInteger(0, 9);
    const randomId3 = randomInteger(0, 9);
    const [randomTrack, setRandomTrack] = useState('')
    const [badAnswerTrack1, setBadAnswerTrack1] = useState('')
    const [badAnswerTrack2, setBadAnswerTrack2] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchTrack = async () => {
            await axios.get(
                'https://api.deezer.com/chart/85'
            )
                .then(res => {
                    setRandomTrack(res.data.tracks.data[randomId])
                    setBadAnswerTrack1(res.data.tracks.data[randomId2])
                    setBadAnswerTrack2(res.data.tracks.data[randomId3])
                    setLoading(false)
                })
        }
        fetchTrack();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(randomTrack);
    console.log(badAnswerTrack1);
    console.log(badAnswerTrack2);

    return (
        <Fragment>
            {loading &&
                <p>loading...</p>
            }
            {randomTrack &&
                <Fragment>
                    <h1>
                        BLINDTEST!
                    </h1>
                    {loading &&
                        <p>loading...</p>
                    }
                    {randomTrack &&
                        <RandomTrackPreview
                            track={{
                                preview: randomTrack.preview
                            }}
                        />
                    }
                    <TrackCard />
                    <DisplayResult />
                    <NewGameButton />
                </Fragment>
            }
        </Fragment>
    )
}

export default Blindtest

