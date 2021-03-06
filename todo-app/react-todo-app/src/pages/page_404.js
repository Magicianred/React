import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
    root: {
        height: '90vh',
        backgroundSize: '75%',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(../page_not_found.png)`
    },
    title: {
        fontSize: '100px',
    }
}); 

function page_404(props){
    const {classes }= props;
    return (
        <div>
            <div className={classes.root}></div>
        </div>
    )
}

export default withStyles(styles)(page_404);