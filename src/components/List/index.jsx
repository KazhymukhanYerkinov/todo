import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import removeSvg from '../../assets/img/remove.svg';

import Badge from '../Badge/Badge';

import './List.scss';


const List = ({ items, isRemovable, onClick, onRemove }) => {
    console.log(items)
    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список ?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            })
                                               
        }
    }

    return (
        <ul className="list" onClick = { onClick }>
            {items.map((item, index) => (
                <li key = {`${item.name}_${index}`} className = {classNames(item.className, { 'active': item.active })}>
                    <i>
                        {item.icon ? (
                            <img src = { item.icon } alt = "list icon"/>) :
                            (<Badge color = {item.color.name}/>)
                        }
                    </i>
                    <span> {item.name} </span>
                    {isRemovable && (
                        <img 
                            className = "list__remove-icon" 
                            src = { removeSvg } 
                            alt = ""
                            onClick = {() => removeList(item) }/>
                        )}
                </li>
            ))}     

        </ul>
    )
}

export default List;