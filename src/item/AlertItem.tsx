import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
        
      },
    },
}));

const AlertItem = (props: any) => {
    const classes = useStyles();
    const messageContent = props.message;
    const status = props.status;
    const showAlert = () => {
      if(messageContent === '' || messageContent === 'undefined' || messageContent === undefined ) {
        return (
          <></>
        )
      }else {
        return (
            <Alert severity={status} color={status}  variant="filled" >
              {messageContent}
            </Alert>
        )
      }
    }
    return (
        <div className={classes.root}>
          {showAlert()}
        </div>
    );
}
export default AlertItem;