
import React from 'react';
import {Alert} from 'react-bootstrap';

/**
 * 弹出消息
 */
const Message=({variant,children})=>{
  return <Alert variant={variant}>{children}</Alert>
}

MessageChannel.defaultProps={
   variant:'info'
}

export default Message