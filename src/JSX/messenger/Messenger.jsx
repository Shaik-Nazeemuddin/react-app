import React, {useState} from 'react';
import Chat from './Chat';
import ContactList from './ContactList';

const contacts = [
    { name: 'Nazeemuddin', email: 'nazeemoddeen@gmail.com'},
    { name: 'Humaira', email: 'humaira@gmail.com'},
    { name: 'SCBasha', email: 'scbashaexarmy@gmail.com'}
]

const Messenger = () => {
    const [to,setTo] = useState(contacts[0]);

    // const handleChange = (contact) => {
    //     setTo(contact);
    // }

    return (
        <div className='custom-component'>
            <div className='container'>
                <ContactList
                    allContacts = { contacts } 
                    selectedContact = { to }
                    onSelect = {(contact) => setTo(contact)}
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
