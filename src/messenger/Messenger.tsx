import  {useState, type SetStateAction} from 'react';
import Chat from './Chat';
import ContactList from './ContactList';

const contacts = [
    { name: 'Nazeemuddin', email: 'nazeemoddeen@gmail.com'},
    { name: 'Humaira', email: 'humaira@gmail.com'},
    { name: 'SCBasha', email: 'scbashaexarmy@gmail.com'}
]

const Messenger = () => {
    const [to,setTo] = useState(contacts[0]);

    // const handleChange = (contact: SetStateAction<{ name: string; email: string; }>) => {
    //     setTo(contact);
    // }

    return (
        <div className='custom-component'>
            <div className='container'>
                <ContactList
                    allContacts = { contacts } 
                    selectedContact = { to }
                    onSelect = {(contact: SetStateAction<{ name: string; email: string; }>) => setTo(contact)}
                />
                <Chat 
                    key={to.email} 
                    contact={to}
                />
            </div>
        </div>
    );
}


export default Messenger;
