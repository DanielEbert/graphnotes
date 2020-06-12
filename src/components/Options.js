import React, { Component } from 'react'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Options extends Component {

  render() {
    return (
      <React.Fragment>
        <div style={{position: 'absolute', bottom: '20px', right: '20px'}}>
          <button 
            type="button" 
            className="btn" 
            style={{backgroundColor:'#559988'}}
            onClick={this.props.logout}
          >
            Logout
          </button>
        </div>

        <div style={{color: 'white', position: 'absolute', left: '20%', bottom: '5px', width: '60%'}}>
            <Tabs
              value={this.props.openTab}
              onChange={this.props.setTab}
              indicatorColor="secondary"
              centered
            >
              <Tab style={{backgroundColor: "rgba(0,0,0,0)"}} label="Notizen" />
              <Tab style={{backgroundColor: "rgba(0,0,0,0)"}} label="TODO" />
              <Tab style={{backgroundColor: "rgba(0,0,0,0)"}} label="3" />
              <Tab style={{backgroundColor: "rgba(0,0,0,0)"}} label="4" />
            </Tabs>
        </div>
        
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
      </React.Fragment>
    )
  }
}

export default Options
