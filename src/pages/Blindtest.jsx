import axios from 'axios'
import AppTitle from '../components/AppTitle';
import NewGameButton from '../components/NewGameButton';
import React, { Fragment, useEffect, useState } from 'react'
import { randomInteger } from '../functions/randomInteger';
import RandomTrackPreview from '../components/RandomTrackPreview';
import { shuffle } from '../functions/shuffle';
import { shuffledApiGenreIds } from '../utils/apiGenreIds';
import TrackCard from '../components/TrackCard';

const Blindtest = () => {

    //will display "loading" when loading
    const [loading, setLoading] = useState(true);
    //will set result as right or wrong
    const [result, setResult] = useState('')
    //will handle the display of the elements we won't need after the user clicks on his answer
    const [display, setDisplay] = useState('')

    //here we create 3 random ids between 0 and 9, since we have 10 tracks in each array we will use
    const randomId = randomInteger(0, 9);
    const randomId2 = randomInteger(0, 9);
    const randomId3 = randomInteger(0, 9);

    //we create three kinds of tracks : one is the good answer, the two other are wrong, using useState to manage their states
    const [goodAnswerTrack, setGoodAnswerTrack] = useState('')
    const [badAnswerTrack1, setBadAnswerTrack1] = useState('')
    const [badAnswerTrack2, setBadAnswerTrack2] = useState('')

    //we need to use useState also for the covers, without it, it would cause two many renders because this data is less accessible than the others
    const [goodCover, setGoodCover] = useState('');
    const [badCover1, setBadCover1] = useState('');
    const [badCover2, setBadCover2] = useState('');

    const fetchData = () => {
        const GOOD_ANSWER_TRACK_API = `https://api.deezer.com/chart/${shuffledApiGenreIds[0]}`;
        const BAD_ANSWER_TRACK_1_API = `https://api.deezer.com/chart/${shuffledApiGenreIds[1]}`;
        const BAD_ANSWER_TRACK_2_API = `https://api.deezer.com/chart/${shuffledApiGenreIds[2]}`

        const getGoodAnswerTrack = axios.get(GOOD_ANSWER_TRACK_API);
        const getBadAnswerTrack1 = axios.get(BAD_ANSWER_TRACK_1_API);
        const getBadAnswerTrack2 = axios.get(BAD_ANSWER_TRACK_2_API);

        axios.all([getGoodAnswerTrack, getBadAnswerTrack1, getBadAnswerTrack2])
        .then(axios.spread((...allData) => {
            setLoading(false);
            setGoodAnswerTrack(allData[0].data.tracks.data[randomId]);
            setGoodCover(allData[0].data.tracks.data[randomId].album.cover_medium)
            setBadAnswerTrack1(allData[1].data.tracks.data[randomId2]);
            setBadCover1(allData[1].data.tracks.data[randomId2].album.cover_medium)
            setBadAnswerTrack2(allData[2].data.tracks.data[randomId3]);
            setBadCover2(allData[2].data.tracks.data[randomId3].album.cover_medium)

        }))
    }

    useEffect(() => {
        fetchData()
    }, [])

    //we create an array of objects which contains the tracks and covers variable for each case
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

    //then we shuffle the elements of this array and declare it as a new variable
    const shuffledTracks = shuffle(randomTracks);

    //when the user clicks on the answer he has chosen, we set results by displaying a message
    //we also want this element and the restart button to be the only ones on the screen, so we add a class "display-none", who does what its name says :)
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
            <div className={display}>

                <AppTitle />

                {loading &&
                    <p>loading...</p>
                }

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

