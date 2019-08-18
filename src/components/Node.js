import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable';
import Resizable from 're-resizable';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Blockquote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import List from '@ckeditor/ckeditor5-list/src/list';
import Fontsize from '@ckeditor/ckeditor5-font/src/fontsize';
import Fontfamily from '@ckeditor/ckeditor5-font/src/fontfamily'


class Node extends Component {

  render() {
    const { id, title, content, posX, posY, width, height, creationDate, modifiedDate } = this.props.note;
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
                this.props.scaleNote(id,
                  this.props.note.width + d.width,
                  this.props.note.height + d.height
                )}}>
            <div style={{height: '100%'}}>
              <div className="handle" style={{paddingBottom:'7px'}}>
                <label className={"NodeLabel"+id}>
                  <input 
                    type="checkbox" 
                    checked={this.props.note.completed ? 'checked' : ''} 
                    onChange={this.props.checkedNote.bind(this, id)}
                  />
                  <span style={{height: '0', position: 'inherit', paddingLeft: '0'}}></span>
                </label>
                {title}
                <button className="btn-floating red" style={closeBtnStyle} onClick={this.props.deleteNote.bind(this, id)}>x</button>
              </div>
              <div style={{textAlign: 'left'}}>
                <CKEditor
                  //onInit={ editor => console.log( 'Editor is ready to use!', editor ) }
                  onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    this.props.contentChangeNote(id, data);
                    } }                     
                    config={ {
                      fontSize: {
                        options: [11, 15, 'default', 19, 23, 30, 35, 40]
                      },
                      plugins: [ Essentials, Paragraph, Bold, Alignment, Heading, Underline, Strikethrough,
                                  Subscript, Superscript, Code, Highlight, Table, TableToolbar, Link,
                                  Blockquote, List, Fontsize, Fontfamily ],
                      toolbar: [ 'heading', '|', 'fontsize', 'fontfamily', '|', 'bold', 'underline', 'highlight', '|', 'alignment', 
                                  'bulletedList', 'numberedList','insertTable', 'link', 'code', 
                                  'blockquote']
                  } }
                  editor={ ClassicEditor }
                  data={content}
                /> 
                <p style={{marginBottom: '0px', fontSize: '80%', textAlign: 'left'}}>Created: {creationDate} <span style={{float: 'right'}}>Modified: {modifiedDate}</span></p>
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
      opacity: this.props.note.completed ? '0.5' : '1',
      position: 'absolute',
      height: 'auto'
    }
  }
}

Node.propTypes = {
  note: PropTypes.object.isRequired
}

const closeBtnStyle = {
  float: 'right',
  width: '23px',
  height: '23px',
  lineHeight: '0'
}

export default Node
