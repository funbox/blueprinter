import Button from 'fb-base-blocks/button';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

const Notification = (props) => (
  <div className={b('notification', props)}>
    { props.title && (
      <p className={b('notification__title')}>
        {props.title}
      </p>
    )}
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
