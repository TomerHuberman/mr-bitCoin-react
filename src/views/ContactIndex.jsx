import { Component } from "react";
import { contactService } from "../services/contact.service";
import { ContactDetails } from "./ContactDetails";
import { ContactList } from "../cmps/ContactList";
import { ContactFilter } from "../cmps/ContactFilter";

export class Contacts extends Component {
  state = {
    contacts: null,
    selectedContactId: null,
    filterBy: {
      term: "",
    },
  };

  componentDidMount() {
    this.loadContacts();
  }

  onSelectContactId = (contactId) => {
    this.setState({ selectedContactId: contactId });
  };

  onChangeFilter = (filterBy) => {
    console.log("filterBy: ", filterBy);
    this.setState({ filterBy: { ...filterBy } }, this.loadContacts);
  };

  loadContacts = async () => {
    try {
      const contacts = await contactService.getContacts(this.state.filterBy);
      this.setState({ contacts });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  render() {
    const { contacts, selectedContactId, filterBy } = this.state;
    if (!contacts) return <div>Loading...</div>;
    return (
      <section className="contacts">
        <h1>Contacts</h1>
        {selectedContactId ? (
          <ContactDetails
            onBack={() => this.onSelectContactId(null)}
            contactId={selectedContactId}
          />
        ) : (
          <>
            <ContactFilter
              filterBy={filterBy}
              onChangeFilter={this.onChangeFilter}
            />
            <ContactList
              onSelectContactId={this.onSelectContactId}
              contacts={contacts}
            />
          </>
        )}
      </section>
    );
  }
}
