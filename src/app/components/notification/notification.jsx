import Button from 'fb-base-blocks/button';

const propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

const Notification = (props) => (
  <div className={b('notification', props)}>
    <div className={b('notification__content')}>
      {props.children}
    </div>
    <Button
      mix={b('notification__close-button')}
      text="Закрыть"
      mods={{
        onlyIcon: true,
      }}
      onClick={props.onClose}
    />
  </div>
);

Notification.propTypes = propTypes;

export default Notification;
