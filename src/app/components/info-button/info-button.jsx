import Button from 'fb-base-blocks/button';

const propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
};

const InfoButton = ({ onClick, to }) => (
  <Button
    mix={b('info-button')}
    title="Show help"
    mods={{ onlyIcon: true }}
    onClick={onClick}
    to={to}
  />
);

InfoButton.propTypes = propTypes;

export default InfoButton;
