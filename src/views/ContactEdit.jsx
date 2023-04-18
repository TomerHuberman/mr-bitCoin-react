import { Component } from "react";
import { contactService } from "../services/contact.service";
import { removeContact } from "../store/actions/contact.actions";
import { connect } from "react-redux";

class _ContactEdit extends Component {
  state = {
    contact: contactService.getEmptyContact(),
  };

  componentDidMount() {
    this.loadContact();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact();
    }
  }

  onBack = () => {
    const contactId = this.props.match.params.id;
    this.props.history.push(`/contact/${contactId}`);
  };

  loadContact = async () => {
    const contactId = this.props.match.params.id;
    if (contactId) {
      try {
        const contact = await contactService.getContactById(contactId);
        this.setState({ contact });
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  onSaveContact = async (ev) => {
    ev.preventDefault();
    try {
      await contactService.saveContact({ ...this.state.contact });
      const contactId = this.props.match.params.id;
      this.props.history.push(`/contact/${contactId}`);
    } catch (error) {
      console.log("error:", error);
    }
  };

  onRemoveContact = async (contactId) => {
    try {
      const res = await this.props.removeContact(contactId);
      this.props.history.push("/contact");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = target.checked;
        break;
      default:
        break;
    }
    this.setState(({ contact }) => ({
      contact: { ...contact, [field]: value },
    }));
  };

  render() {
    const { contact } = this.state;
    if (!contact) return <div>Loading...</div>;
    const robotStyle = {
      backgroundImage: `url(https://robohash.org/${contact._id})`,
    };
    return (
      <section className="contact-edit">
        <nav>
          <button onClick={this.onBack}>Back</button>
          {contact._id && (
            <button onClick={() => this.onRemoveContact(contact._id)}>
              Delate
            </button>
          )}
        </nav>

        <h1>{contact._id ? "Edit" : "Add"}</h1>

        <div className="contact-info">
          <div className="img" style={robotStyle}></div>

          <form onSubmit={this.onSaveContact}>
            <section>
              <label htmlFor="name">Name: </label>
              <input
                onChange={this.handleChange}
                value={contact.name}
                type="text"
                name="name"
                id="name"
              />
            </section>
            <section>
              <label htmlFor="phone">Phone: </label>
              <input
                onChange={this.handleChange}
                value={contact.phone}
                type="text"
                name="phone"
                id="phone"
              />
            </section>
            <section>
              <label htmlFor="email">Email: </label>
              <input
                onChange={this.handleChange}
                value={contact.email}
                type="text"
                name="email"
                id="email"
              />
            </section>
            <button>Save</button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  removeContact,
};

export const ContactEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactEdit);
