import ParametersTable__Row, { parameterProps } from './__row';

const headingData = [
  {
    type: 'name',
    content: 'Название',
  },
  {
    type: 'attribute',
    content: 'Атрибут',
  },
  {
    type: 'valueType',
    content: 'Тип',
  },
  {
    type: 'description',
    content: 'Описание',
  },
];

const ParametersTable = (props) => {
  const {
    params,
  } = props;

  return (
    <div className={b('parameters-table', props)}>
      <div className={b('parameters-table__heading')}>
        <div className={b('parameters-table__row')}>
          {
            headingData.map(data => (
              <div
                className={b('parameters-table__cell', { mods: { type: data.type } })}
                key={data.type}
              >
                {data.content}
              </div>
            ))
          }
        </div>
      </div>
      <div className={b('parameters-table__body')}>
        {
          params.map((parameter, index) => (
            <ParametersTable__Row
              parameter={parameter}
              key={`parameter-${index}`}
            />
          ))
        }
      </div>
    </div>
  );
};

const propTypes = {
  params: PropTypes.arrayOf(parameterProps),
};

ParametersTable.propTypes = propTypes;

export default ParametersTable;
