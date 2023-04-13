import { Component } from "react";
import { contactService } from "../services/contact.service";

export class ContactDetails extends Component {
  state = {
    contact: null,
  };

  componentDidMount() {
    this.loadContact();
  }

  loadContact = async () => {
    const contact = await contactService.getContactById(this.props.contactId);
    this.setState({ contact });
  };

  render() {
    const { contact } = this.state;
    if (!contact) return <div>Loading...</div>;

    return (
      <section className="contact-details">
        <h1>this is contact details</h1>
        <pre>{JSON.stringify(contact, null, 2)}</pre>
        <button onClick={this.props.onBack}>Back</button>
      </section>
    );
  }
}
