import RawContent from 'app/components/raw-content';
import Anchor from 'app/components/anchor';

const defaultTitle = 'Resource';
const defaultContent = '';

class Resource extends React.Component {
  render() {
    const { route } = this.context.router;
    const { resource } = this.props;
    const hasContent = !!resource.content && resource.content.length > 0;
    const hasTitle = !!resource.meta && !!resource.meta.title && !!resource.meta.title.content;

    const title = hasTitle ? resource.meta.title.content : defaultTitle;
    const content = hasContent ? resource.meta.text.content : defaultContent;

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
