import RawContent from 'app/components/raw-content';
import Anchor from 'app/components/anchor';
import { get } from 'app/common/utils/helpers';

const defaultTitle = 'Resource';
const defaultContent = '';

class Resource extends React.Component {
  render() {
    const { route } = this.context.router;
    const { resource } = this.props;

    const title = get('meta', 'title', 'content').from(resource) || defaultTitle;
    const content = get('meta', 'text', 'content').from(resource) || defaultContent;

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
        <div className="resource__content">
          <RawContent>
            {content}
          </RawContent>
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
};

Resource.contextTypes = {
  router: PropTypes.object,
};

export default Resource;
