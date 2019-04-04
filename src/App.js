import React, { Component } from 'react';
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import Options from './components/Options'
import './App.css';
import uuid from 'uuid'
import axios from 'axios'

import TodoItem from './components/TodoItem'


class App extends Component {
  state = {
    todos: [],
    autosave: true,
    nodeCreatorOpen: false,
    nodeCreatorPos: {x: 0, y: 0},
    nodeCreatorTitle: ''
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:5000/g') 
      .then(res => this.setState(res.data))

    this.interval = setInterval(() => this.autosaveTriggered(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onMouseClick = (e) => {
    //250 is half of note width
    if (e.target.className === 'App') {
      if (!this.state.nodeCreatorOpen) {
        this.setState({'nodeCreatorOpen': true})
        this.setState({'nodeCreatorPos': {x: e.pageX-10, y: e.clientY-15}})
      } else {
        this.setState({'nodeCreatorOpen': false})
        this.setState({nodeCreatorTitle: ''})
        //remove current input from inputform
      }
      //if already input open -> close that input and set makingnode=false, else:
      //this.addTodoAtPos(uuid.v4(), e.pageX-250, e.clientY-50)
    }
  }
  
  autosaveTriggered = () => {
    if (this.state.autosave)
      this.saveState()
  }

  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })})
  }

  delTodo = (id) => {
    this.setState({todos: [...this.state.todos.filter(
      todo => todo.id !== id
    )]})
  }

  addTodoAtPos = (title, posX, posY) => {
    const newTodo = {
      id: uuid.v4(),
      title: title,
      completed: false,
      posX: posX,
      posY: posY,
      width: 545,
      height: 170
    }
    this.setState({todos: [...this.state.todos, newTodo]})
  }

  setScale = (id, width, height) => {
    console.log(width, height)
    this.setState({todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.width = width
        todo.height = height
      }
      return todo;
    })})
  }

  moveNote = (id, e, ui) => {
    this.setState({todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.posX += ui.deltaX
        todo.posY += ui.deltaY
      }
      return todo;
    })})
  }

  contentChange = (id, content) =>  {
    this.setState({todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.content = content
      }
      return todo;
    })})
  }

  toggleAutosave = () => {
    this.setState({'autosave': !this.state.autosave}, this.saveState)
  }

  saveState = () => {
    axios.post('http://127.0.0.1:5000/p', this.state)
  }

  nodeCreatorTitleCreate = (e) => {
    e.preventDefault();
    //if (!this.state.title) return;
    this.addTodoAtPos(this.state.nodeCreatorTitle, this.state.nodeCreatorPos.x-250, this.state.nodeCreatorPos.y);
    this.setState({'nodeCreatorOpen': false})
    this.setState({nodeCreatorTitle: ''})
  }

  nodeCreatorTitleChange = (e) => {
    this.setState({'nodeCreatorTitle': e.target.value})
  }

  exitCreateNewNode = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      this.setState({'nodeCreatorOpen': false})
      this.setState({nodeCreatorTitle: ''})
    }
  }

  render() {
    return (
      <div className="App" onMouseDown={this.onMouseClick}>
        <div className="container">
          <AddTodo 
            nodeCreatorOpen={this.state.nodeCreatorOpen} 
            nodeCreatorPos={this.state.nodeCreatorPos}
            nodeCreatorTitle={this.state.nodeCreatorTitle}
            nodeCreatorTitleCreate={this.nodeCreatorTitleCreate}
            nodeCreatorTitleChange={this.nodeCreatorTitleChange}
            exitCreateNewNode={this.exitCreateNewNode}
          />
          {this.state.todos.map((todo) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                markComplete={this.markComplete}
                delTodo={this.delTodo}
                contentChange={this.contentChange}
                setScale={this.setScale} 
                moveNote={this.moveNote} 
              />
          ))}
          <Options 
            saveState={this.saveState} 
            autosave={this.state.autosave}
            toggleAutosave={this.toggleAutosave}
          />
        </div>
      </div>
    );
  }
}

export default App;
