import React, { useState, useEffect } from 'react'

export const Searchpanel = ({param,setParam}) => {
 
    const [users, setUsers] = useState([])
    //{/**setParam(Object.assign({},param,{name:e.target.value})) */}

   

    return <form>
        <div>
            <input type="text"
                value={param.name}
                onChange={e => setParam({ ...param, name: e.target.value })} />
            <select
                value={param.personId}
                onChange={e => setParam({ ...param, personId: e.target.value })}>
                <option value={""}>负责人</option>

                {
                    users.map(user =>
                        <option value={user.id}>{user.name}</option>
                    )
                }

            </select>
        </div>
    </form>

}

