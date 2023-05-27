import { useState, useEffect } from 'react';
import { ContactForm } from './PhoneBook/ContactForm/ContactForm';
import { ContactsList } from './PhoneBook/ContactsList/ContactsList';
import { Filter } from './PhoneBook/Filter/Filter';
import PropTypes from 'prop-types';
import { Container } from './PhoneBook/UI/Container/Container.styled';
import { TittleStyled } from './PhoneBook/UI/Tittle.styled';

const LS_KEY = 'contacts_list';
export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = newContact => {
    const alredyInContacts = contacts.some(
      ({ name }) => name === newContact.name
    );

    if (alredyInContacts) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts([...contacts, newContact]);
  };

  const onFilterChange = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const onDeleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const getFilteredContacts = () => {
    const optimizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(optimizedFilter)
    );
  };

  const visibleContacts = getFilteredContacts();

  return (
    <Container>
      <TittleStyled>Phonebook</TittleStyled>
      <ContactForm onContactAdd={onAddContact} />
      <TittleStyled>Contacts</TittleStyled>
      <Filter value={filter} onFilter={onFilterChange} />
      <ContactsList contacts={visibleContacts} onDelete={onDeleteContact} />
    </Container>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
