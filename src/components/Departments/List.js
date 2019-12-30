import React from 'react'

let List = (props) => {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>

                {props.departments.map((department, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{department.name}</td>
                            <td><button onClick={() => props.handleRemove(department)} >Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}

export default List