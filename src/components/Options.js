import React, { Component } from 'react'

class Options extends Component {

  render() {
    return (
      <div style={{position: 'absolute', bottom: '20px', left: '20px'}}>
        <button 
          type="button" 
          className="btn" 
          style={{backgroundColor: this.props.autosave ? '#4d8760' : '#829187', marginRight: '20px'}}
          onClick={this.props.toggleAutosave}
        >
          AutoSave
        </button>
        <button 
          type="button" 
          className="btn" 
          style={{backgroundColor:'#559988'}}
          onClick={this.props.saveState}
        >
          Save
        </button>
      </div>
    )
  }
}

export default Options
