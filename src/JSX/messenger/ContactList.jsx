import React from 'react';

const ContactList = ({allContacts,onSelect}) => {

    return (
        <section className='contactList'>
            <ul>
                {allContacts.map((contact,index) =>
                    <li key={index}>
                        <button className="btn btn-info" onClick={() => {
                            onSelect(contact)
                        }}>
                        {contact.name}
                        </button>
                    </li>
                )}
            </ul>
        </section>
    );
}

export default ContactList;
