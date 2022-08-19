import Lowlight from 'react-lowlight';
import json from 'highlight.js/lib/languages/json';
import http from 'highlight.js/lib/languages/http';
import plaintext from 'highlight.js/lib/languages/plaintext';

Lowlight.registerLanguage('http', http);
Lowlight.registerLanguage('json', json);
Lowlight.registerLanguage('plaintext', plaintext);

const observerAvailable = 'IntersectionObserver' in window;

class CodeSnippet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      useHighlight: !observerAvailable,
    };

    this.el = React.createRef();
  }

  componentDidMount() {
    if (!observerAvailable) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const { isIntersecting } = entry;
        if (!this.state.useHighlight && isIntersecting) {
          this.setState({
            useHighlight: true,
          });
          this.observer.disconnect();
          this.observer = null;
        }
      });
    });
    this.observer.observe(this.el.current);
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  render() {
    const { useHighlight } = this.state;
    const { disabledSyntax } = this.props.mods;
    const preferredSyntax = this.props.syntax;

    return (
      <div className={b('code-snippet', this.props)} ref={this.el}>
        {
          useHighlight ? (
            <Lowlight
              className="code-snippet__raw"
              language={disabledSyntax ? 'plaintext' : preferredSyntax}
              value={this.props.children}
            />
          ) : (
            <pre className="code-snippet__raw">
              {this.props.children}
            </pre>
          )
        }
      </div>
    );
  }
}

CodeSnippet.defaultProps = {
  syntax: 'json',
  mods: {},
};

CodeSnippet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  syntax: PropTypes.oneOf(['json', 'http']),
  mods: PropTypes.object,
};

export default CodeSnippet;
