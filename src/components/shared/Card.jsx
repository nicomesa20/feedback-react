import PropTypes from "prop-types";
function Card({ children, reverse }) {
  return <div className={`card ${reverse && "reverse"}`}>{children}</div>;
}

Card.defaultProps = {
  reverse: false,
};

Card.proptype = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool.isRequired,
};
export default Card;
