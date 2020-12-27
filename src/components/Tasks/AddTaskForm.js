import React from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

const AddTaskForm = ({ list, onAddTask}) => {
    const [visibleForm, setVisibleForm] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState("");

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm)
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/tasks', obj).then(({ data }) => {
            onAddTask(list.id, data);
            toggleFormVisible();
        }).catch(() => {
            alert("Ошибка при добавлении задачи !")
        }) 
        .finally(() => {
            setIsLoading(false);
        })
    }
    return (
        <div className="tasks__form">
            {!visibleForm ?  

            <div onClick = { toggleFormVisible } className="tasks__form-new">
                <img src={addSvg} alt="" />
                <span> Новая завача </span>
            </div>:

            <div className = "tasks__form-block">
                <input className = "field" type = "text" placeholder = "Текст задачи" onChange = {e => setInputValue(e.target.value)}/>
                <button disabled = { isLoading } className = "button" onClick = { addTask }> {isLoading ? 'Добавление': 'Добавить задачу'} </button>
                <button className = "button button--grey" onClick = { toggleFormVisible }> Отмена </button>
            </div>}
           
            
        </div>
    );
}

export default AddTaskForm