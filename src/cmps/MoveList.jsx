import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function MoveList({ title, contactId }) {
  const [moves, setMoves] = useState([]);

  const user = useSelector((state) => state.userModule.loggedInUser);

  useEffect(() => {
    let moves;
    moves = contactId
      ? user.moves.filter((move) => move.toId === contactId)
      : user.moves.slice(0, 3);
    setMoves(moves);
  }, [moves]);

  return (
    <section className="move-list">
      <h2>{title}</h2>
      {moves.map((move) => {
        return (
          <div key={move.at}>
            <h3>
              <span>Transferd to:</span> {move.to}
            </h3>
            <article className="info">
            <h4>
              <span>Amount:</span> {move.amount}
              {+move.amount === 1 ? " coin" : " coins"}
            </h4>
            <span>At: {new Date(move.at).toLocaleString()}</span>
            </article>
          </div>
        );
      })}
    </section>
  );
}
