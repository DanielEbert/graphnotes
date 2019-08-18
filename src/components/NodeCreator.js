import React, { Component } from 'react'

class NodeCreator extends Component {

  render() {
    if (!this.props.nodeCreatorOpen)
      return null

    return (
      <form 
          onSubmit={this.props.nodeCreatorTitleCreate} 
          style={{
            display: 'flex', 
            position: 'absolute', 
            left: this.props.nodeCreatorPos.x,
            top: this.props.nodeCreatorPos.y
          }}>
        <input 
          className="browser-default"
          type="text" 
          name="title" 
          style={{flex: '10', padding: '5px'}} 
          placeholder="Title"
          onKeyDown={this.props.nodeCreatorExit}
          value={this.props.nodeCreatorTitle}
          onChange={this.props.nodeCreatorTitleChange}
        />
        <input 
          type="submit" 
          value="Submit" 
          className="btn" 
          style={{flex: '1'}}
        />
      </form>
    )
  }
}

export default NodeCreator
