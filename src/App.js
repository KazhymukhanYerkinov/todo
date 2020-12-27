import React from 'react';
import { List, Tasks, AddButtonList } from './components';
import axios from 'axios';
import listSvg from './assets/img/list.svg';

function App() {

  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });

    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    })
  }, [])
  
  
  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  }

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  }

  const onEditListTitle = (id,title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList)
  }
  
  return (
    <div className = "todo">
      <div className = "todo__sidebar">
        <List items = {[
          {
            active: true,
            icon: listSvg,
            name: 'Все задачи',
          }
        ]}/>

        
        {lists ? <List 
          items = { lists } 
          isRemovable 
          onRemove = {id => {
            const newList = lists.filter(item => item.id !== id);
            setLists(newList)
          }}
          onClickItem = {item => setActiveItem(item)}
          activeItem = { activeItem }
        />: ('Загрузка...')}
        <AddButtonList onAddList = { onAddList } colors = { colors }/>
      </div>

      <div className = "todo__tasks">
        { lists && activeItem && <Tasks list = { activeItem } onAddTask = { onAddTask } onEditTitle = { onEditListTitle }/>}
      </div>
    </div>
  );
}

export default App;
