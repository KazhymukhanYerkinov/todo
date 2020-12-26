import React from 'react';
import { List, Tasks, AddButtonList } from './components';
import axios from 'axios';
import listSvg from './assets/img/list.svg';

function App() {

  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);

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
  if (!lists){
    return <div></div>;
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

        
        <List items = { lists } isRemovable onRemove = {id => {
          const newList = lists.filter(item => item.id !== id);
          setLists(newList)
        }}/>
        <AddButtonList onAddList = { onAddList } colors = { colors }/>
      </div>

      <div className = "todo__tasks">
        <Tasks list = { lists[1] }/>
      </div>
    </div>
  );
}

export default App;
