import Link from 'app/components/link';

const views = require('sandbox/views/sandbox-views-list').views;

export default class SandboxNavigation extends React.Component {
  render() {
    return (
      views.length > 0 && (
        <nav className={b('sandbox-navigation', this.props)}>
          <Link
            mix="sandbox-navigation__service-link"
            to="/"
          >
            Перейти в сервис
          </Link>

          <ul className="sandbox-navigation__list">
            {views.map((item, index) => {
              const Tag = item.to ? Link : 'span';

              const attrs = {
                ...(item.to
                  ? {
                    to: item.to,
                    mix: 'sandbox-navigation__link',
                  }
                  : { className: 'sandbox-navigation__link' }),
              };

              return (
                <li
                  key={index}
                  className="sandbox-navigation__item"
                >
                  <Tag {...attrs}>{item.name}</Tag>
                </li>
              );
            })}
          </ul>
        </nav>
      )
    );
  }
}

SandboxNavigation.contextTypes = {
  router: PropTypes.object,
};
