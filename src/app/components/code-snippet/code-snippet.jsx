import Highlight from 'react-highlight/lib/optimized';

const CodeSnippet = (props) => {
  const disabledSyntax = props.mods && props.mods.disabledSyntax;
  const preferredSyntax = props.syntax;
  const languages = disabledSyntax ? [] : ['json', 'http'];

  return (
    <div className={b('code-snippet', props)}>
      <Highlight languages={languages} className={disabledSyntax ? 'nohighlight' : preferredSyntax}>
        {props.children}
      </Highlight>
    </div>
  );
};

CodeSnippet.defaultProps = {
  syntax: 'json',
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
