import Transition__Body from '../..';

const Transition__Body_View_Sequential = (props) => {
  const {
    availableTransactions,
    contentType,
    parentId,
  } = props;

  return availableTransactions.map((transaction, index) => (
    <div
      key={`${parentId}-${contentType}-${index}`}
      className={b('transition__stripe')}
    >
      <Transition__Body
        availableTransactions={[transaction]}
        contentType={contentType}
      />
    </div>
  ));
};

export default Transition__Body_View_Sequential;
