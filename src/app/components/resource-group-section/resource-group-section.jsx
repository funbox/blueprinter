import RawContent from 'app/components/raw-content';
import Anchor from 'app/components/anchor';

const defaultTitle = 'Resource Group';
const defaultContent = '';

class ResourceGroupSection extends React.Component {
  render() {
    const { route } = this.context.router;
    const { group } = this.props;
    const hasContent = !!group.content && group.content.length > 0;
    const hasTitle = !!group.meta && !!group.meta.title && !!group.meta.title.content;

    const title = hasTitle ? group.meta.title.content : defaultTitle;
    const content = hasContent ? group.meta.text.content : defaultContent;
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
