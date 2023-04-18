import { Component } from "react";
import { contactService } from "../services/contact.service";
import { Link } from "react-router-dom";
import { TransferFund } from "../cmps/TransferFund";
import { MoveList } from "../cmps/MoveList";

export class ContactDetails extends Component {
  state = {
    contact: null,
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
    this.props.history.push("/contact");
  };

  onTransferCoins = (amount, contact) => {
    this.props.transferCoins(amount, contact);
  };

  loadContact = async () => {
    const contact = await contactService.getContactById(
      this.props.match.params.id
    );
    this.setState({ contact });
  };

  render() {
    const { contact } = this.state;
    if (!contact) return <div>Loading...</div>;
    const robotStyle = {
      backgroundImage: `url(https://robohash.org/${contact._id})`,
    };
    return (
      <section className="contact-details">
        <nav>
          <button onClick={this.onBack}>Back</button>
          <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
        </nav>
        <div className="details-container">
          <div className="img" style={robotStyle}></div>
          <h1>{contact.name}</h1>
          <h3>{contact.phone}</h3>
          <h4>{contact.email}</h4>
        </div>
        <TransferFund
          contact={contact}
          onTransferCoins={this.onTransferCoins}
        />
        <MoveList
          title={`Transfer history to ${contact.name}`}
          contactId={contact._id}
        />
      </section>
    );
  }
}
