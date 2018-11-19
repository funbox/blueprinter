import { Link } from 'react-router-dom';

const views = require('sandbox/views/sandbox-views-list').views;

export default class SandboxNavigation extends React.Component {
  render() {
    const router = this.context.router;

    return (
      views.length > 0 && <nav className="sandbox-navigation">
        <h2 className="sandbox-navigation__title">
          Навигация по песочнице
        </h2>
        <ul>
          {views.map((item, index) => (
            <li
              key={index}
            >
              {!!item.to && <Link to={item.to}>{item.name}</Link>}
              {!item.to && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

SandboxNavigation.contextTypes = {
  router: PropTypes.object,
};
