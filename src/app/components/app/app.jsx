import parseSourceFile from 'app/common/utils/helpers/parseSourceFile';
import sourceMock from 'app/source';

import Home from 'app/views/home';
import Error from 'app/views/error';

const source = window.refract || sourceMock;
const parsedSource = parseSourceFile(source);

export default class App extends React.Component {
  render() {
    return parsedSource.topLevelMeta.error ? (
      <Error
        error={parsedSource.topLevelMeta.error}
        warnings={parsedSource.topLevelMeta.warnings}
      />
    ) : (
      <Home parsedSource={parsedSource} location={this.props.location}/>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
  }),
};
