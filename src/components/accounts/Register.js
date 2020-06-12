import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = () => ({
  title: {
    textAlign: 'center',
    fontSize: '400%',
    width: '100%',
    marginTop: '2rem',
    marginBottom: '1rem'
  },
  usernameInput: {
    marginTop: '2rem'
  },
  multilineColor:{
    color:'red'
}
})

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: "",
      pw: ""
    };
  }

  idInputChange = (e) => {
    this.setState({'id': e.target.value})
  }

  pwInputChange = (e) => {
    this.setState({'pw': e.target.value})
  }

  //TODO: check if there is the possibility that state id or pw aren't updated yet
  submit = (e) => {
    this.props.register(this.state.id, this.state.pw)
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid container>
        <Grid item xs={2}/>
        <Grid container item direction="column" xs={8}>
          <p className={classes.title}>Register</p>
          <Divider/>
          <Grid container>
            <Grid item xs={3}/>
            <Grid item xs={6} container spacing={1} alignItems="flex-end">
              <Grid item>
                <i className="material-icons prefix">account_circle</i>
              </Grid>
              <Grid item xs={11}>
                <TextField className={classes.usernameInput} onChange={this.idInputChange} fullWidth label="Username" />
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}/>
            <Grid item xs={6} container spacing={1} alignItems="flex-end">
              <Grid item>
                <i className="material-icons prefix">lock</i>
              </Grid>
              <Grid item xs={11}>
                <TextField className={classes.usernameInput} onChange={this.pwInputChange} type="password" fullWidth label="Password" />
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Button
              style={{marginTop: '3rem', width: '25%'}}
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.submit}
            > Submit <SendIcon style={{marginLeft: '1rem'}}/> </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Register);