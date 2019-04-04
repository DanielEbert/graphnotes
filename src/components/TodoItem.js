import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable';
import Resizable from 're-resizable';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class TodoItem extends Component {

  render() {
    const { id, title, content, posX, posY, width, height } = this.props.todo;
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={{x: posX, y: posY }}
        scale={1}
        onStart={this.handleStart}
        onDrag={(e, ui) => {
          this.props.moveNote(id, e, ui)
        }}
        onStop={this.handleStop}>
        <div style={this.noteDivStyle()}>
          <Resizable 
              enable={{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false }}
              defaultSize={{ width: width, height: 'auto', }}
              minWidth={'100'}
              minHeight={'70'}
              onResizeStop={(e, direction, ref, d) => {
                this.props.setScale(id,
                  this.props.todo.width + d.width,
                  this.props.todo.height + d.height
                )}}>
            <div className="container" style={{height: '100%'}}>
                <div className="handle" style={{paddingBottom:'7px'}}>
                  <input 
                    type="checkbox" 
                    checked={this.props.todo.completed ? true : false} 
                    onChange={this.props.markComplete.bind(this, id)}
                    style={{float: 'left'}}
                  />
                  {title}
                  <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
                </div>
                <div style={{
                    width: '100%', 
                    height: 'calc(100% - 25px)', 
                    boxSizing: 'border-box', 
                    margin: '0px',
                    outline: 'none',
                    resize: 'none',
                    backgroundColor: 'rgba(255, 255, 255,.4)',
                  }}> 
                  <CKEditor
                    editor={ ClassicEditor }
                    data={content}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        this.props.contentChange(id, data);
                    } }
                    onBlur={ editor => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        console.log( 'Focus.', editor );
                    } }
                  />
                </div>
                
            </div>
          </Resizable>
        </div>
      </Draggable>
    );
  }

  noteDivStyle = () => {
    return {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      padding: '7px 10px',
      margin: '7px 10px',
      opacity: this.props.todo.completed ? '0.5' : '1',
      position: 'absolute',
      height: 'auto'
    }
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  'padding': '2px 6px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}

export default TodoItem
