import React, { memo } from 'react'

import {ALbumWrapper} from './style'
import {getSizeImage} from '@/utils/format-utils'

export default memo(function HYAlbumCover(props) {

    const {info, size='130px', width='153px', bgp='-845px'} = props

    return (
        <ALbumWrapper size={size} width={width} bgp={bgp}>
            <div className="album-image">
                <img src={getSizeImage(info.picUrl, size)} alt=''/>
                <a href="/abc" className="cover sprite_covor">{info.name}</a>
            </div>

            <div className="album-info">
                <div className="name">{info.name}</div>
                <div className="artist">{info.artist.name}</div>
            </div>
        </ALbumWrapper>
    )
})
