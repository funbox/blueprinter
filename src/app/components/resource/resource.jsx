import RawContent from 'app/components/raw-content';
import Anchor from 'app/components/anchor';
import { get } from 'app/common/utils/helpers';

const defaultTitle = 'Resource';

class Resource extends React.Component {
  render() {
    const { route } = this.context.router;
    const { resource, children } = this.props;

    const title = get('meta', 'title', 'content').from(resource) || defaultTitle;
    const description = get('meta', 'text', 'content').from(resource);

    return (
      <section className="resource">
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
              {description}
            </RawContent>
          )}

          <div className="resource__content">
            {children}
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
