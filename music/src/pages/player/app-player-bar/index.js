import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Slider } from 'antd';

import {
    PlaybarWrapper,
    Control,
    PlayInfo,
    Operator
} from './style'

import { getSongDetailAction } from '../store/actionCreators'
import { 
    getSizeImage,
    formatDate,
    getPlaySong 
} from '@/utils/format-utils.js'


export default memo(function HYAppPlaybar() {

    const dispatch = useDispatch()

    const state = useSelector(state => ({
        currentSong:state.getIn(['play','currentSong'])
    }),shallowEqual)

    useEffect(() => {
        dispatch(getSongDetailAction(167876))
    }, [dispatch])
    const audioRef = useRef()

    const picUrl =  state.currentSong.al && state.currentSong.al.picUrl;
    const singerName = (state.currentSong.ar && state.currentSong.ar[0].name) || '未知歌手';
    const duration =  state.currentSong.dt || 0;
    const showDuration = formatDate(duration,'mm:ss')


    const playMusic=()=>{
        audioRef.current.src = currentSong

    }

    return (
        <PlaybarWrapper className='sprite_playbar'>
            <div className='content wrap-v2'>
                <Control>
                    <button className='sprite_playbar btn prev'></button>
                    <button className='"sprite_playbar btn play' onClick={e=>playMusic()}></button>
                    <button className='sprite_playbar btn next'></button>
                </Control>
                <PlayInfo>
                    <div className='image'>
                        <a href='#'>
                            <img src={getSizeImage(picUrl,35)} alt=''/>                       </a>
                    </div>
                    <div className='info'>
                        <div className='song'>
                            <span className='song-name'>{state.currentSong.name}</span>
                            <a href='#/' className='singer-name'>{singerName}</a>
                        </div>
                        <div className='progress'>
                            <Slider defaultValue={30} />
                            <div className='time'>
                                <span className='now-time'>12:12</span>
                                <span className='divider'>/</span>
                                <span className='duration'>{showDuration}</span>
                            </div>
                        </div>
                    </div>
                </PlayInfo>
                <Operator>
                    <div className='left'>
                        <button className="sprite_playbar btn favor"></button>
                        <button className="sprite_playbar btn share"></button>
                    </div>

                    <div className="right sprite_playbar">
                        <button className="sprite_playbar btn volume"></button>
                        <button className="sprite_playbar btn loop"></button>
                        <button className="sprite_playbar btn playlist"></button>
                    </div>
                </Operator>
            </div>
            <audio ref='audioRef'/>
        </PlaybarWrapper>
    )
})
