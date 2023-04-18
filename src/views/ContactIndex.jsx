import { Component } from "react";
import { contactService } from "../services/contact.service";
import { ContactList } from "../cmps/ContactList";
import { connect } from "react-redux";
import { ContactFilter } from "../cmps/ContactFilter";
import { loadContacts, setFilterBy } from "../store/actions/contact.actions";

class _ContactIndex extends Component {
  state = {
    contacts: null,
    filterBy: {
      term: "",
    },
  };

  componentDidMount() {
    this.props.loadContacts();
  }

  onSelectContactId = (contactId) => {
    this.setState({ selectedContactId: contactId });
  };

  onChangeFilter = (filterBy) => {
    this.props.setFilterBy(filterBy);
    this.props.loadContacts();
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
    const { contacts, filterBy } = this.props;
    if (!contacts) return <div>Loading...</div>;
    return (
      <section className="contact-index">
        <h1>Contacts</h1>
        <ContactFilter
          filterBy={filterBy}
          onChangeFilter={this.onChangeFilter}
        />
        <ContactList
          onSelectContactId={this.onSelectContactId}
          contacts={contacts}
        />
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  contacts: state.contactModule.contacts,
  filterBy: state.contactModule.filterBy,
});

const mapDispatchToProps = {
  loadContacts,
  setFilterBy,
};

export const ContactIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactIndex);
