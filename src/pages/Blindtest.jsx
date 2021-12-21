import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import DisplayResult from '../components/DisplayResult';
import NewGameButton from '../components/NewGameButton';
import RandomTrackPreview from '../components/RandomTrackPreview';
import { shuffle } from '../functions/shuffle';
import { randomInteger } from '../functions/randomInteger';

const Blindtest = () => {
    const randomId = randomInteger(0, 9);
    const randomId2 = randomInteger(0, 9);
    const randomId3 = randomInteger(0, 9);
    const [goodAnswerTrack, setGoodAnswerTrack] = useState('')
    const [badAnswerTrack1, setBadAnswerTrack1] = useState('')
    const [badAnswerTrack2, setBadAnswerTrack2] = useState('')
    const [goodCover, setGoodCover] = useState('');
    const [badCover, setBadCover] = useState('');
    const [badCover2, setBadCover2] = useState('');
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchTrack = async () => {
            await axios.get(
                'https://api.deezer.com/chart/85'
            )
                .then(res => {
                    setGoodAnswerTrack(res.data.tracks.data[randomId])
                    setGoodCover(res.data.tracks.data[randomId].album.cover)
                    setBadCover(res.data.tracks.data[randomId2].album.cover)
                    setBadCover2(res.data.tracks.data[randomId3].album.cover)
                    setBadAnswerTrack1(res.data.tracks.data[randomId2])
                    setBadAnswerTrack2(res.data.tracks.data[randomId3])
                    setLoading(false)
                })
        }
        fetchTrack();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(goodCover);



    const randomTracks = [
        {
            track: goodAnswerTrack,
            cover: goodCover
        },
        {
            track: badAnswerTrack1,
            cover: badCover
        },
        {
            track: badAnswerTrack2,
            cover: badCover2
        }
    ];


    const shuffledTracks = shuffle(randomTracks);
    console.log(shuffledTracks);


    return (
        <Fragment>
            {loading &&
                <p>loading...</p>
            }
            {goodAnswerTrack &&
                <Fragment>
                    <h1>
                        BLINDTEST!
                    </h1>
                    {loading &&
                        <p>loading...</p>
                    }
                    {randomTracks &&
                        <RandomTrackPreview
                            track={{
                                preview: randomTracks.preview
                            }}
                        />
                    }
                    {shuffledTracks &&
                        <ul className='track-cards'>
                            {
                                shuffledTracks.map((track, i) => {
                                    return (
                                        <li className='track-card' key={i}>
                                            <img src={track.cover} alt="cover" />
                                            <p>{track.track.title}</p>                                          
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                    <DisplayResult />
                    <NewGameButton />
                </Fragment>
            }
        </Fragment>
    )
}

export default Blindtest

