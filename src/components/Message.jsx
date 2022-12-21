const Message = ({ message = 'This is an alert', type = "primary" }) => {
  const classAlert = `alert alert-${type}`;

  return <div className={classAlert}>{message}</div>;
};

export default Message;
