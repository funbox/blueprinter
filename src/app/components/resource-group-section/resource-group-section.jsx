import RawContent from 'app/components/raw-content';
import Anchor from 'app/components/anchor';
import { get } from 'app/common/utils/helpers';

const defaultTitle = 'Resource Group';
const defaultContent = '';

class ResourceGroupSection extends React.Component {
  render() {
    const { route } = this.context.router;
    const { group } = this.props;

    const title = get('meta', 'title', 'content').from(group) || defaultTitle;
    const content = get('meta', 'text', 'content').from(group) || defaultContent;

    return (
      <section className="resource-group-section">
        <h2 className="resource-group-section__heading">
          {title}
          <Anchor
            mix="resource-group-section__anchor"
            title={title}
            pathname={route.location.pathname}
          />
        </h2>
        <div className="resource-group-section__content">
          <RawContent>
            {content}
          </RawContent>
        </div>
      </section>
    );
  }
}

ResourceGroupSection.defaultProps = {
  group: {},
};

ResourceGroupSection.propTypes = {
  group: PropTypes.shape({
    element: PropTypes.string,
    meta: PropTypes.object,
    content: PropTypes.array,
  }),
};

ResourceGroupSection.contextTypes = {
  router: PropTypes.object,
};

export default ResourceGroupSection;
