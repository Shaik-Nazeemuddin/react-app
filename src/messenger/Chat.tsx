import  {useState} from 'react';

const Chat = ({contact} :any) => {
  const [text, setText] = useState('');

  const handleSendMail = () => {
    window.location.href = `mailto:${contact.email}?subject=Hello&body=This is the email body.`;
  };

  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder= {' Chat to ' + contact.name}
        onChange={ e => setText(e.target.value) }
      />
      <br />
      <button onClick={handleSendMail}>Send Mail {contact.email}</button>
    </section>
  );

}

export default Chat;
