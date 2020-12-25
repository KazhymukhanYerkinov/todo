import React from 'react';
import List from '../List';
import Badge from '../Badge/Badge';


import './AddButtonList.scss';
import addSvg from '../../assets/img/add.svg';
import closeSvg from '../../assets/img/close.svg';



const AddButtonList = ({ colors, onAddList }) => {
    const [visiblePopup, setVisiblePopup] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState(colors[0].id);
    const [inputValue, setInputValue] = React.useState('');

    const onClose = () => {
      setVisiblePopup(false);
      setInputValue('');
      selectedColor(colors[0].id);
    }

    const addList = () => {
      if (!inputValue) {
        alert('Введите название списка');
        return;
      }
      const color = colors.filter(c => c.id === selectedColor)[0].name;
      onAddList({ id: Math.random(), name: inputValue, color: color });
      onClose();
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
            <button className = "button" onClick = { addList }> Добавить </button>
          </div>}

        </div>
    )
}

export default AddButtonList;