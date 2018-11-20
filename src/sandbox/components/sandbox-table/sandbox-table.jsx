const SandboxTable = (props) => {

  const buildTableData = () => {
    return props.data.map((row, i) => {
      return (
        <tr key={`row-${i}`} className="sandbox-table__row">
          {row.map((cell, j) => (
            <td
              key={`cell-${i}${j}`}
              className="sandbox-table__cell"
            >{cell}</td>
          ))}
        </tr>
      )
    });
  };

  return (
    <table className={b('sandbox-table', props)}>
      <tbody>
        {buildTableData()}
      </tbody>
    </table>
  );
};

SandboxTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array),
};

export default SandboxTable;
