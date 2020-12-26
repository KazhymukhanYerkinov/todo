import React from 'react';
import axios from 'axios';

import List from '../List';
import Badge from '../Badge/Badge';


import './AddButtonList.scss';
import addSvg from '../../assets/img/add.svg';
import closeSvg from '../../assets/img/close.svg';



const AddButtonList = ({ colors, onAddList }) => {
    const [visiblePopup, setVisiblePopup] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState(3);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
      if (Array.isArray(colors)) {
        setSelectedColor(colors[0].id)
      }
    }, [colors])

    const onClose = () => {
      setVisiblePopup(false);
      setInputValue('');
      setSelectedColor(colors[0].id);
    }

    const addList = () => {
      if (!inputValue) {
        alert('Введите название списка');
        return;
      }
      setIsLoading(true)
      axios.post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor }).then(({ data }) => {
        const color = colors.filter(c => c.id === selectedColor)[0].name;
        const listObj = { ...data, color: { name: color } }
        onAddList(listObj);
        onClose();
        
      }).finally(() => {
        setIsLoading(false);
      })
      
    }

    return (
        <div className = "add-list">
          <List 
            onClick = {() => setVisiblePopup(true)}
            items = {[
              {
                className: 'list__add-button',
                icon: addSvg,
                name: 'Добавить список'
              },
            ]}/>

          {visiblePopup && <div className = "add-list__popup">
            <img
              onClick = {onClose} 
              src = { closeSvg } 
              alt = "" 
              className = "add-list__popup-close-btn"/>
            <input value = { inputValue } onChange = {(e) => setInputValue(e.target.value) } className = "field" type = "text" placeholder = "Название папка"/>
            <div className = "add-list__popup-colors">
              {
                colors.map(color => <Badge 
                                      onClick = {() => setSelectedColor(color.id)} 
                                      key = {color.id} 
                                      color = {color.name}
                                      className = {selectedColor === color.id && 'active'} />)
              }
            </div>
            <button className = "button" onClick = { addList }> {isLoading ? 'Добавление':'Добавить'} </button>
          </div>}

        </div>
    )
}

export default AddButtonList;