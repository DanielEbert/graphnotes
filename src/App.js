import React, { Component } from 'react';
import NodeCreator from './components/NodeCreator'
import Options from './components/Options'
import './App.css';
import uuid from 'uuid'
import axios from 'axios'
import * as utils from './utils/utils'
import Node from './components/Node'

//import LineTo from 'react-lineto';  // https://www.npmjs.com/package/react-lineto


// TODO: find way to connect node without drawing over other nodes


class App extends Component {
  state = {
    notes: [],
    contentChanged: false,
    autosave: true,
    nodeCreatorOpen: false,
    nodeCreatorPos: {x: 0, y: 0},
    nodeCreatorTitle: '',
    draggingPanel: false,
    mousePos: {x: 0, y: 0},
    from: "",
    to: ""
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:5000/g') 
      .then(res => this.setState(res.data))
      .catch(res => console.log(res))

    this.interval = setInterval(() => this.autosaveTriggered(), 3000);

    this.setupBeforeUnloadListener();
  }

  // does this work?
  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return this.onClose();
    });
  };

  onClose = () => {
    this.autosaveTriggered();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  autosaveTriggered = () => {
    // TODO: add field to check if data has changed. if data hasnt changed we dont send
    if (this.state.autosave && this.state.contentChanged) {
      this.setState({contentChanged: false})
      this.saveState()
    }
  }

  saveState = () => {
    axios.post('http://127.0.0.1:5000/p', this.state)
  }

  contentChanged = () => {
    this.setState({contentChanged: true})
  }

  checkedNote = (id) => {
    this.setState({notes: this.state.notes.map(note => {
      if (note.id === id) {
        note.completed = !note.completed
      }
      return note;
    })})
    this.contentChanged()
  }

  deleteNote = (id) => {
    this.setState({notes: [...this.state.notes.filter(
      note => note.id !== id
    )]})
    this.contentChanged()
  }

  createNote = (title, posX, posY) => {
    const newNote = {
      id: uuid.v4(),
      title: title,
      completed: false,
      posX: posX,
      posY: posY,
      width: 628,
      height: 170,
      creationDate: utils.getDate(),
      modifiedDate: utils.getDate()
    }
    this.setState({notes: [...this.state.notes, newNote]})

    // TODO: this doesnt work yet right?
    if (this.state.notes.length >= 2) {
      this.setState({from: "NodeLabel"+this.state.notes[0].id, to: "NodeLabel"+this.state.notes[1].id})
    }
  }

  scaleNote = (id, width, height) => {
    this.setState({notes: this.state.notes.map(note => {
      if (note.id === id) {
        note.width = width
        note.height = height
      }
      return note;
    })})
    this.contentChanged()
  }

  moveNote = (id, e, ui) => {
    this.setState({notes: this.state.notes.map(note => {
      if (note.id === id) {
        note.posX += ui.deltaX;
        note.posY += ui.deltaY;
      }
      return note;
    })})
    this.contentChanged()
  }

  contentChangeNote = (id, content) =>  {
    this.setState({notes: this.state.notes.map(note => {
      if (note.id === id) {
        note.modifiedDate = utils.getDate()
        note.content = content
      }
      return note;
    })})
    this.contentChanged()
  }

  toggleAutosave = () => {
    this.setState({'autosave': !this.state.autosave}, this.saveState)
    this.contentChanged()
  }

  nodeCreatorTitleCreate = (e) => {
    e.preventDefault();
    //if (!this.state.title) return;
    this.createNote(this.state.nodeCreatorTitle, this.state.nodeCreatorPos.x-250, this.state.nodeCreatorPos.y);
    this.setState({'nodeCreatorOpen': false})
    this.setState({nodeCreatorTitle: ''})
    this.contentChanged()
  }

  nodeCreatorTitleChange = (e) => {
    this.setState({'nodeCreatorTitle': e.target.value})
  }

  nodeCreatorExit = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      this.setState({'nodeCreatorOpen': false})
      this.setState({nodeCreatorTitle: ''})
    }
    this.contentChanged()
  }

  onMouseDown = (e) => {
    if (e.target.className === 'App') {
      this.setState({draggingPanel: true})
    }
  }

  onMouseUp = (e) => {
    this.setState({draggingPanel: false})
    this.contentChanged()
  }

  onMouseMove = (e) => {
    this.setState({'mousePos': {x: e.pageX, y: e.pageY}})

    if (this.state.draggingPanel) {
      this.setState({notes: this.state.notes.map(note => {
        note.posX += e.movementX
        note.posY += e.movementY
        return note;
      })})
    }
  }

  keyPressed = (e) => {
    if (e.target.className === 'App' && e.key === 'c') {
      e.preventDefault();
      if (!this.state.nodeCreatorOpen) {
        this.setState({'nodeCreatorOpen': true})
        this.setState({'nodeCreatorPos': {x: this.state.mousePos.x-10, y: this.state.mousePos.y -15}})
      } else {
        this.setState({'nodeCreatorOpen': false})
        this.setState({nodeCreatorTitle: ''})
      }
      this.contentChanged()
    }
  }

  render() {
    return (
      <div className="App" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} 
          onMouseMove={this.onMouseMove} onKeyPress={this.keyPressed} tabIndex="0">
        <div className="container">
          <NodeCreator 
            nodeCreatorOpen={this.state.nodeCreatorOpen} 
            nodeCreatorPos={this.state.nodeCreatorPos}
            nodeCreatorTitle={this.state.nodeCreatorTitle}
            nodeCreatorTitleCreate={this.nodeCreatorTitleCreate}
            nodeCreatorTitleChange={this.nodeCreatorTitleChange}
            nodeCreatorExit={this.nodeCreatorExit}
          />
          {this.state.notes.map((note) => (
              <Node 
                key={note.id} 
                note={note} 
                checkedNote={this.checkedNote}
                deleteNote={this.deleteNote}
                contentChangeNote={this.contentChangeNote}
                scaleNote={this.scaleNote} 
                moveNote={this.moveNote}
                creationDate={note.creationDate}
                modifiedDate={note.modifiedDate}
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
