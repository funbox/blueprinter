import Section from 'app/components/section';

import Transition__Body, { transitionBodyProps } from './__body';

const Transition = (props) => {
  const {
    title,
    titleTag = 'h4',
    availableTransactions,
    contentType,
    mix,
  } = props;

  return (
    <Section
      title={title}
      titleTag={titleTag}
      mods={{ for: 'transition' }}
      mix={mix}
    >
      <Transition__Body
        availableTransactions={availableTransactions}
        contentType={contentType}
      />
    </Section>
  );
};

Transition.propTypes = {
  ...transitionBodyProps,
  contentType: PropTypes.oneOf(['request', 'response']),
  title: PropTypes.string,
  titleTag: PropTypes.string,
  mix: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

export default Transition;
