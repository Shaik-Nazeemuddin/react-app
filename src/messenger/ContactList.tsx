import type { Key } from "react";

const ContactList = ({allContacts,onSelect}:any) => {

    return (
        <section className='contactList'>
            <ul>
                {allContacts.map((contact: { name: string ;email :string },index: Key | null | undefined) =>
                    <li key={index}>
                        <button onClick={() => {
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
