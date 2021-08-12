/**
 * @description 推荐榜单
 */
import React, { memo, useEffect } from 'react'

import HYThemeHeaderRCM from '@/components/theme-header-rcm'
import HYTopRanking from '@/components/top-ranking'

import {RankingWrapper} from './style'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getTopData} from '../../store/actionCreatiors'

export default memo(function HYRecomendRanking() {

    const state = useSelector(state => ({
        topUpLists: state.getIn(["recommend", "topUpLists"]),
        topNewLists: state.getIn(["recommend", "topNewLists"]),
        topOriginLists: state.getIn(["recommend", "topOriginLists"])
    }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTopData(0));
        dispatch(getTopData(2));
        dispatch(getTopData(3));
    }, [dispatch])
    

    return (
        <RankingWrapper>
            <HYThemeHeaderRCM title='推荐榜单'/>
            <div className='tops'>
                <HYTopRanking info={state.topUpLists}/>
                <HYTopRanking info={state.topNewLists}/>
                <HYTopRanking info={state.topOriginLists}/>
            </div>
        </RankingWrapper>
    )
})
