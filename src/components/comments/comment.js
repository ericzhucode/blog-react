import './index.less';
import React, { Component } from 'react';
import { Avatar, Button, Input } from 'antd';
import GuestIcon from '../../assets/GuestIcon.png'

const { TextArea } = Input;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      content: '',
    };
  }

  componentWillMount() { }

  render() {
    return (
      <div className="comment">
        <div className="comment-avatar">
          <Avatar
            className="auth-logo"
            size={90}
            src={GuestIcon}
          />
        </div>
        <div className="comment-content">
          <TextArea
            className="textarea"
            name="content"
            value={this.props.content}
            onChange={this.props.handleChange}
            placeholder="随时愿意倾听你的声音！"
            rows={4}
          />
          <div className="new-comment write-function-block">
            {this.props.isSubmitLoading ? (
              <div href="/" className="btn btn-send">
                发送中...
              </div>
            ) : (
              <Button
                type="primary"
                ghost
                onClick={this.props.handleAddComment}
                className="btn btn-send"
              >
                Send
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
