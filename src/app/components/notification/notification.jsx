import { t } from '@lingui/macro';
import Button from 'fb-base-blocks/button';

import Notification__CloseButtonIcon from './__close-button-icon/notification__close-button-icon.svg?inline';

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
      text={t`Close`}
      mods={{
        onlyIcon: true,
      }}
      icon={{
        content: <Notification__CloseButtonIcon/>,
        mix: b('notification__close-button-icon'),
      }}
      onClick={props.onClose}
    />
  </div>
);

Notification.propTypes = propTypes;

export default Notification;
