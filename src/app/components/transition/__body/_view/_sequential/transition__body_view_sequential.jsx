import Transition__Body from '../..';

const Transition__Body_View_Sequential = (props) => {
  const {
    availableTransactions,
    contentType,
  } = props;

  return availableTransactions.map(transaction => (
    <div className={b('transition__stripe')}>
      <Transition__Body
        availableTransactions={[transaction]}
        contentType={contentType}
      />
    </div>
  ));
};

export default Transition__Body_View_Sequential;
