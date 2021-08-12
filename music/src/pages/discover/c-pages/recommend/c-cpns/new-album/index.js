/**
 * @description 新碟上架
 */

import React, { memo,useEffect, useRef } from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { Carousel } from 'antd';

import HYThemeHeaderRCM from '@/components/theme-header-rcm'
import HYAlbumCover from '@/components/album-cover'
import {AlbumWrapper} from './style'
import {getNewAlbumAction} from '../../store/actionCreatiors'
import { NEW_ALBUM_PAGE_NUM, NEW_ALBUM_PER_PAGE} from '@/common/contants.js'

export default memo(function HYNewAlbum() {
  // redux拿到数据
  const state = useSelector(state => ({
    newAlbums: state.getIn(['recommend', 'newAlbums'])
  }),shallowEqual)
//dispatch发出请求
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getNewAlbumAction())
  }, [dispatch])

  const carouselRef = useRef()

    return (
      <AlbumWrapper>
        <HYThemeHeaderRCM title='新碟上架'/>
        <div className='content'>
          <button className='arrow arrow-left sprite_02' 
          onClick={e=>carouselRef.current.prev()}/>
          <div className='album'>
            <Carousel ref={carouselRef} dots={false}>
              {
                [0,1].map(item=>{
                  return (
                  <div key={item} className='page'>
                   {
                   state.newAlbums.slice(item*NEW_ALBUM_PER_PAGE,(item+NEW_ALBUM_PAGE_NUM)*NEW_ALBUM_PER_PAGE).map(iten=>{
                     return <HYAlbumCover key={iten.id} info={iten} size='100px' width='118px' bgp='-570px'>{iten.name}</HYAlbumCover>
                   })
                   }
                  </div>)
                })
              }
            </Carousel>
          </div>
          <button className="arrow arrow-right sprite_02"
             onClick={e => carouselRef.current.next()}/>
        </div>
      </AlbumWrapper>
    )
})
