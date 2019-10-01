/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { loadCSS } from 'fg-loadcss';

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CommentIcon from '@material-ui/icons/Comment';

import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';
import CommentContext from '../../context/comment/commentContext';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@material-ui/core';

// Color theme for page
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ED8121'
    },    
    secondary: {
      main: '#56635B'
    }
  }
});

const styles = {
  card: {
    backgroundColor: '#1B1B1B',
    borderBottom: '1px solid #ED8121',    
    borderRadius: '0px',
    '& .MuiCardHeader-root': {
      padding: '10px 10px 0px 10px',      
    },
    '& .MuiCardHeader-content': {
      display: 'flex',
      marginBottom: '0px',
      '& .MuiTypography-h5': {
        color: '#ED8121',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '24px',
        padding: '3px 10px 3px 10px',
        border: '1px solid',       
        borderRadius: '10px'
      },
      '& .MuiTypography-body1': {
        color: '#C3C3EE',
        marginLeft: 'auto',
        fontSize: '14px'
      }
    },
    '& .MuiCardContent-root': {
      padding: '5px 10px 5px 10px',
      '& .MuiTypography-colorTextSecondary': {
        color: '#E0E0E0'
      }
    },
    '& .MuiCardActions-root': {
      padding: '0px 10px 0px 10px',
      '& path': {
        color: '#C3C3EE'
      },
      '& .material-icons': {
        color: '#C3C3EE'
      }
    },
  },
  card2: {
    backgroundColor: '#492A42',
    borderBottom: '1px solid #ED8121', 
    borderRadius: '0px',
    '& .MuiCardHeader-content': {
      display: 'flex',
      marginBottom: '0px',
      '& .MuiTypography-h5': {
        color: '#ED8121',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '24px',
        padding: '3px 10px 3px 10px',
        border: '1px solid',       
        borderRadius: '10px'
      },
      '& .MuiTypography-body1': {
        color: '#C3C3EE',
        marginLeft: 'auto',
        fontSize: '14px'
      }
    },
    '& .MuiCardContent-root': {
      padding: '5px 10px 5px 10px',
      '& .MuiTypography-colorTextSecondary': {
        color: '#E0E0E0'
      }
    },
    '& .MuiCardActions-root': {
      padding: '0px 10px 0px 10px',
      '& path': {
        color: '#C3C3EE'
      },
      '& .material-icons': {
        color: '#C3C3EE'
      }
    },
  },
  deleteButton: {
    marginLeft: 'auto',
    color: '#b10000'
  },
  cardWidth: {
    width: '100%',
  },
  dialogButton: {
    backgroundColor: '#151D26',
  },
  margin: {
    cursor: 'pointer',
  },
  chip: {
    color: '#ED8121',
    border: '1px solid #ED8121',
    backgroundColor: '#151D26',
  },
  chip2: {
    color: 'white',
    border: '1px solid #ED8121',
    backgroundColor: '#ED8121',
  },
  postDisplay: {
    marginRight: '10px',
    cursor: 'pointer',
  },
};

const useStyles = makeStyles(styles);

const Post = ({ post }) => {

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.11.2/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);
  const commentContext = useContext(CommentContext);
  const { user } = authContext;
  const { deletePost, openComments, commentView, setCurrentPost, currentPost } = postContext;
  const { comments } = commentContext;
  const [open, setOpen] = React.useState(false);

  let numComments = 0;
  for (let i=0; i<comments.length; i++) {
    if (comments[i].postID === post._id) {
      numComments += 1;
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const onclick = () => {
    deletePost(post._id);
    handleClose();
  };
  const handleComments = (stuff) => {
    setCurrentPost(stuff);
    openComments();
  };
  if (user) {
    return (
      <ThemeProvider theme={theme}>
        <Card className={user.userName === post.userName ? classes.card2 : classes.card}>
          <CardHeader title={post.userName} subheader={post.date} />          
          <CardContent className={classes.cardWidth}>
            <Typography variant="p" color="textSecondary">
              {post.content}
            </Typography>                      
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="comments">
              <Badge className={classes.margin} badgeContent={numComments} color="primary" onClick={() => handleComments(post)}>
                <CommentIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="i'll drink to that">
              <Icon className="fas fa-beer" color="secondary" />
            </IconButton>
            {
              user.userName === post.userName &&
              <IconButton aria-label="delete forever" 
                className={classes.deleteButton}
                onClick={handleClickOpen}>
                <DeleteForeverIcon />
              </IconButton>                          
            }
          </CardActions>
        </Card>
        
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete this post??</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {post.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onclick} color="primary" className={classes.dialogButton}>
              Yes
            </Button>
            <Button onClick={handleClose} color="primary" className={classes.dialogButton} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
  return (
    <h1>Loading</h1>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
