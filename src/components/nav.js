import React, { Component } from 'react';
import icon from '../img/icon.svg';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const styles = () => ({
  nav: {
    background: '#80d8ff',
    height: '3rem',
  },
  navleft: {
    display: 'flex',
  },
  birdicon: {
    height: '3rem',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    paddingLeft: '3rem'
  },
  heading: {
    height: '3rem',
    marginTop: 0,
    marginBottom: 0,
    lineHeight: '3rem'
  }
})

class Nav extends Component {

  loginOrLogout = () => {
    if (this.props.authorized) {
      return <Button onClick={this.props.logout} href="/" style={{paddingRight: '3rem', paddingLeft: '3rem'}}>Logout</Button>
    } else {
      return <React.Fragment>
        <Button href="login" style={{paddingRight: '3rem', paddingLeft: '3rem'}}>Login</Button>
        <Button href="register" style={{paddingRight: '3rem', paddingLeft: '3rem', marginRight: '3rem'}}>Register</Button>
      </React.Fragment> 
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.nav} container>
        <Grid className={classes.navleft} item xs>
          <img className={classes.birdicon} src={icon} alt='icon'></img>
          <h1 className={classes.heading}>Authentication</h1>
        </Grid>
        <Grid container item xs={6} justify="flex-end">
          {this.loginOrLogout()}
        </Grid>
      </Grid>
    )}
}

export default withStyles(styles)(Nav);