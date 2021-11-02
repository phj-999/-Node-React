import React, { useState, useEffect } from 'react'

import Searchpanel from "./search-panel";
import List from "./list";

const apiUrl = process.env.REACT_APP_API_URL

export const Index = () => {
    const [param, setParam] = useState({ name: '', personId: "" })
    const [list, setList] = useState([])
    useEffect(() => {
        fetch('').tenen(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param])

    return (
        <div>
            <Searchpanel param={param} setParam={setParam}/>
            <List list={list}/>
        </div>
    )
}
