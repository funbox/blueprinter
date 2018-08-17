import RawContent from 'app/components/raw-content';
import Anchor from 'app/components/anchor';
import { get, hashFromTitle, htmlFromText } from 'app/common/utils/helpers';

const defaultTitle = 'Resource';

class Resource extends React.Component {
  render() {
    const { route } = this.context.router;
    const { resource, children } = this.props;

    const title = get('meta', 'title', 'content').from(resource) || defaultTitle;
    const href = get('attributes', 'href', 'content').from(resource);
    const description = resource.content[0].element === 'copy' ? resource.content[0].content : null;

    return (
      <section className="resource" id={hashFromTitle(title)}>
        <h3 className="resource__heading">
          {title}
          <Anchor
            mix="resource__anchor"
            title={title}
            pathname={route.location.pathname}
          />
        </h3>
        <div className="resource__body">
          {!!description && (
            <RawContent mix="resource__description">
              {htmlFromText(description)}
            </RawContent>
          )}

          <div className="resource__content">
            {React.Children.map(children, (child) => React.cloneElement(child, { href }))}
          </div>
        </div>
      </section>
    );
  }
}


Resource.defaultProps = {
  resource: {},
};

Resource.propTypes = {
  resource: PropTypes.shape({
    element: PropTypes.string,
    meta: PropTypes.object,
    content: PropTypes.array,
  }),
  children: PropTypes.node,
};

Resource.contextTypes = {
  router: PropTypes.object,
};

export default Resource;
