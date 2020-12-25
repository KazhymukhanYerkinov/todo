import React from 'react';
import classNames from 'classnames';

import removeSvg from '../../assets/img/remove.svg';

import Badge from '../Badge/Badge';

import './List.scss';


const List = ({ items, isRemovable, onClick, onRemove }) => {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список ?')) {
            onRemove(item);                                     
        }
    }

    return (
        <ul className="list" onClick = { onClick }>
            {items.map((item, index) => (
                <li key = {`${item.name}_${index}`} className = {classNames(item.className, { 'active': item.active })}>
                    <i>
                        {item.icon ? (
                            <img src = { item.icon } alt = "list icon"/>) :
                            (<Badge color = {item.color}/>)
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