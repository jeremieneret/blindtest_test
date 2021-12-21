import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import NewGameButton from '../components/NewGameButton';
import RandomTrackPreview from '../components/RandomTrackPreview';
import TrackCard from '../components/TrackCard';
import { shuffle } from '../functions/shuffle';
import { randomInteger } from '../functions/randomInteger';
import {shuffledApiGenreIds} from '../utils/apiGenreIds'

const Blindtest = () => {


    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState('')
    const [display, setDisplay] = useState('')

    const randomId = randomInteger(0, 9);
    const randomId2 = randomInteger(0, 9);
    const randomId3 = randomInteger(0, 9);

    const [goodAnswerTrack, setGoodAnswerTrack] = useState('')
    const [badAnswerTrack1, setBadAnswerTrack1] = useState('')
    const [badAnswerTrack2, setBadAnswerTrack2] = useState('')

    const [goodCover, setGoodCover] = useState('');
    const [badCover1, setBadCover1] = useState('');
    const [badCover2, setBadCover2] = useState('');

    useEffect(() => {
        const fetchGoodTrack = async () => {
            await axios.get(
                `https://api.deezer.com/chart/${shuffledApiGenreIds[0]}`
            )
                .then(res => {
                    setGoodAnswerTrack(res.data.tracks.data[randomId])
                    setGoodCover(res.data.tracks.data[randomId].album.cover_medium)

                    setLoading(false)
                })
        }
        fetchGoodTrack();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchBadTrack1 = async () => {
            await axios.get(
                `https://api.deezer.com/chart/${shuffledApiGenreIds[1]}`
            )
                .then(res => {
                    setBadAnswerTrack1(res.data.tracks.data[randomId2])
                    setBadCover1(res.data.tracks.data[randomId2].album.cover_medium)

                    setLoading(false)
                })
        }
        fetchBadTrack1();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchBadTrack2 = async () => {
            await axios.get(
                `https://api.deezer.com/chart/${shuffledApiGenreIds[2]}`
            )
                .then(res => {
                    setBadAnswerTrack2(res.data.tracks.data[randomId3])
                    setBadCover2(res.data.tracks.data[randomId3].album.cover_medium)

                    setLoading(false)
                })
        }
        fetchBadTrack2();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const randomTracks = [
        {
            track: goodAnswerTrack,
            cover: goodCover
        },
        {
            track: badAnswerTrack1,
            cover: badCover1
        },
        {
            track: badAnswerTrack2,
            cover: badCover2
        }
    ];

    const shuffledTracks = shuffle(randomTracks);

    const handleChange = (e) => {
        if (e.target.value === goodAnswerTrack.title) {
            setResult('Yes! You know your classics!')
        } else {
            setResult('Nope... Try again!')
        }
        setDisplay('display-none')
    }

    return (
        <Fragment>
            {loading &&
                <p>loading...</p>
            }

            <h1>
                BLINDTEST!
            </h1>
            {loading &&
                <p>loading...</p>
            }
            <div className={display}>
                {goodAnswerTrack &&
                    <RandomTrackPreview
                        track={{
                            preview: goodAnswerTrack.preview,
                            title: goodAnswerTrack.title
                        }}
                    />
                }
                {shuffledTracks &&
                    <ul className='track-cards'>
                        {
                            shuffledTracks.map((track, i) => {
                                return (
                                    <li className='track-card'
                                        key={i}
                                    >
                                        <TrackCard
                                            track={{
                                                id: track.id,
                                                cover: track.cover,
                                                title: track.track.title,
                                            }}
                                            handleChange={handleChange}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
            {result &&
                <div>
                    <h1>{result}</h1>
                    <NewGameButton />
                </div>
            }

        </Fragment>
    )
}

export default Blindtest

