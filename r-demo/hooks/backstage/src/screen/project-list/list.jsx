import React from 'react'

export const list = ({list}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
            </thead>
            <tbody>
                {
                    list.map(project=><tr>
                        <td>
                            {project.name}
                        </td>
                        <td>
                            {project.personname}
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    )
}
