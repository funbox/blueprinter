import Section from 'app/components/section';

import Transition__Body, { transitionBodyProps } from './__body';
import Transition__Body_View_Sequential from './__body/_view/_sequential';

const Transition = (props) => {
  const {
    title,
    titleTag = 'h4',
    availableTransactions,
    contentType,
    mods = {},
    mix,
  } = props;

  const ContentComponent = mods.view === 'expanded' ? Transition__Body_View_Sequential : Transition__Body;

  return (
    <Section
      title={title}
      titleTag={titleTag}
      mods={{ for: 'transition' }}
      mix={[b('transition', {}, mods), mix]}
    >
      <ContentComponent
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
