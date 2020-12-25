import React from 'react';
import List from './components/List/index';
import Tasks from './components/Tasks/Tasks';

import listSvg from './assets/img/list.svg';
import AddButtonList from './components/AddButtonList/AddButtonList';
import DB from './assets/db.json';

function App() {
  const [lists, setLists] = React.useState(
    DB.lists.map(item => {
      item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;
      return item;
    }));
  
  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  } 
  return (
    <div className = "todo">
      <div className = "todo__sidebar">
        <List items = {[
          {
            icon: listSvg,
            name: 'Все задачи',
          }
        ]}/>

        
        <List items = { lists } isRemovable onRemove = {() => alert(1) }/>
        <AddButtonList onAddList = { onAddList } colors = { DB.colors }/>
      </div>

      <div className = "todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
