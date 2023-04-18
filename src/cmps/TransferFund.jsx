import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transferCoins } from "../store/actions/user.actions";

export function TransferFund({ contact }) {
  const [amount, setAmount] = useState(0);
  const [amountToHigh, setAmountToHigh] = useState(false);
  const user = useSelector((state) => state.userModule.loggedInUser);
  const dispatch = useDispatch();

  function onSetAmount({ target }) {
    if (target.value > user.balance && !amountToHigh) setAmountToHigh(true);
    if (target.value < user.balance && amountToHigh) setAmountToHigh(false);

    setAmount(target.value);
  }

  function onTransferCoins(ev, amount, contact) {
    ev.preventDefault();
    dispatch(transferCoins(amount, contact));
    setAmount("");
  }

  return (
    <section className="transfer-fund">
      <h3>Transfer coins to {contact.name}</h3>
      <h4 className={amountToHigh ? "amount-to-high" : ""}>
        Current balance: {user.balance}
      </h4>
      <form onSubmit={(ev) => onTransferCoins(ev, amount, contact)}>
        <label htmlFor="amount"></label>
        <input
          onChange={onSetAmount}
          value={amount}
          type="number"
          max={user.balance}
          min={1}
          name="amount"
          id="amount"
        />
        <button type="submit">Sand</button>
      </form>
      {amountToHigh && <p className="amount-to-high">Not enough coins</p>}
    </section>
  );
}
