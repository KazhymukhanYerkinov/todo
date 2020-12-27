import React from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';

import { List, Tasks, AddButtonList } from './components';
import axios from 'axios';
import listSvg from './assets/img/list.svg';

function App() {

  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);
  let history = useHistory();
  let location = useLocation();

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

  const onEditTask  = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text);

    if (!newTaskText) {
      return;
    }
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = item.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    axios.patch('http://localhost:3001/tasks/' + taskObj.id, { 
      text: newTaskText 
    }).catch(() => {
      alert('Не удалось изменить задачу')
    })
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу ?')) {
      const newList = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId);
        }
        return item;
      })
      setLists(newList);
      axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
          alert('Не удалось удалить задачу')
      })
    }
  }

  React.useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId))
      setActiveItem(list)
    }
  },[lists, location.pathname ])
  
  return (
    <div className = "todo">
      <div className = "todo__sidebar">
        <List 
        onClickItem = {list => {
          history.push('/');
        }}
        items = {[
          {
            active: !activeItem,
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
          onClickItem = {list => {
            
            history.push(`/lists/${list.id}`)
          }}
          activeItem = { activeItem }
        />: ('Загрузка...')}
        <AddButtonList onAddList = { onAddList } colors = { colors }/>
      </div>

      <div className = "todo__tasks">
        <Route exact path = "/">
          { lists &&
            lists.map(list => (
              <Tasks 
                key = { list.id }
                list = { list }
                onAddTask = { onAddTask }
                onEditTitle = { onEditListTitle }
                withoutEmpty
              />
            ))
          }
        </Route>
        <Route path = "/lists/:id">
          { 
            lists && 
            activeItem && 
            <Tasks 
              list = { activeItem } 
              onAddTask = { onAddTask } 
              onEditTitle = { onEditListTitle }
              onRemoveTask = {onRemoveTask}
              onEditTask = { onEditTask } />
          }
              
        </Route>
      </div>
    </div>
  );
}

export default App;
