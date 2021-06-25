import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("FriendCard");

function FriendCard(props) {
  const oneFriend = props.friends;

  const onFriendInfo = () => {
    props.onEditButton(props.friends);
    _logger("clicked on edit button");
  };

  const onDeleteFriend = () => {
    props.onDeleteBtn(props.friends);
  };

  return (
    <div className="card" style={{ width: "18rem", marginBottom: "1rem" }}>
      <div className="card-body">
        <img
          src={oneFriend.primaryImage.imageUrl}
          className="card-img-top"
          alt="..."
        />
        <h5 className="card-title title">{oneFriend.title}</h5>
        <p className="card-text summary">{oneFriend.summary}</p>
        <button
          type="button"
          className="btn btn-outline-primary"
          style={{ margin: "5px" }}
          onClick={onFriendInfo}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={onDeleteFriend}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

FriendCard.propTypes = {
  friends: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    primaryImage: PropTypes.shape({
      imageUrl: PropTypes.string,
    }),
  }),
};

export default FriendCard;
