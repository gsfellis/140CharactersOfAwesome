/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import CloseIcon from '@material-ui/icons/Close';
import Comment from './Comment';


import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';
import CommentContext from '../../context/comment/commentContext';


const useStyles = makeStyles(theme => ({
  paper: {
    width: 400,
    margin: 'auto',
    marginTop: '10%',
    backgroundColor: '#ED8121',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  comments: {
    marginTop: '10px',
    maxHeight: 200,
    position: 'relative',
    overflow: 'auto',
    // backgroundColor: 'white',
    backgroundColor: '#151D26',
    color: 'white',
  },
  submit: {
    marginTop: '8px',
    float: 'right',
    color: 'white',
    backgroundColor: '#151D26',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    color: '#ED8121',
  },
  closeIcon: {
    float: 'right',
    cursor: 'pointer',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ED8121',
    },
    secondary: {
      main: '#b09fa5',
    },
  },
});

const Comments = () => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);
  const commentContext = useContext(CommentContext);

  const { closeComments, currentPost } = postContext;
  const { user } = authContext;
  const { comments, addComment } = commentContext;

  const classes = useStyles();

  const comment = {
    userName: `${user && user.userName}`,
    content: '',
    postID: currentPost._id,
  };


  const onChange = (e) => {
    comment.content = e.target.value;
  };

  const newForm = () => {
    document.getElementById('comment-form').reset();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(comment);
    newForm();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.paper}>
        <CloseIcon className={classes.closeIcon} onClick={closeComments} />
        <h2 id="simple-modal-title">{currentPost.userName}</h2>
        <p id="simple-modal-description">
          {currentPost.content}
        </p>
        <form action="" className={classes.formStyles} id="comment-form" onSubmit={onSubmit}>
          <TextField
            maxLength="140"
            id="outlined-freddense-multiline"
            label="Say Something"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            multiline
            rowsMax="4"
            onChange={onChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
              Comment
          </Button>
        </form>
        <List className={classes.comments}>
          {comments.map((comment) => (
            currentPost._id === comment.postID && <Comment key={comment._id} comment={comment} />
          ))}
        </List>

      </div>
    </ThemeProvider>
  );
};

export default Comments;
