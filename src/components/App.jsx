import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './contactForm/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';

import css from './app.module.css';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(initialContacts);

  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (!storedContacts) {
      const storedContacts = JSON.stringify(initialContacts);
      localStorage.setItem('contacts', storedContacts);
    }
  }, []);

  useEffect(() => {
    const existingContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(existingContacts);

    if (contacts !== null) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    if (contacts !== initialContacts) {
      const changeInContacts = JSON.stringify(contacts);
      localStorage.setItem('contacts', changeInContacts);
    }
  }, [contacts]);

  const addContactOnSubmit = ({ name, number }) => {
    const contactOnList = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (contactOnList) {
      alert('This contact is already on Your list');
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts([...contacts, newContact]);
    }
  };

  const deleteContact = contactId => {
    const remainingContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts([...remainingContacts]);
  };

  const onFilterChange = event => {
    event.preventDefault();
    setFilter(event.target.value.toLowerCase());
  };

  const showFilteredContact = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter);
    });
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={addContactOnSubmit}
        name={name}
        number={number}
        setName={setName}
        setNumber={setNumber}
      />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onFilterChange} />
      <ContactList contacts={showFilteredContact()} onDelete={deleteContact} />
    </div>
  );
};
