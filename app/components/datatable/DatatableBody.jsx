import {
  DatatableEmpty,
  DatatableHeader,
  DatatableRow,
} from "./DatatableDefaultCell";

const wrapColumns = (c) => ({ name: c });

const getColumns = (schema, results) => {
  const columns = schema.fields;
  if (columns) {
    // convert all columns to objects
    return Object.keys(columns);
  } else if (results && results.length > 0) {
    // if no columns are provided, default to using keys of first array item
    return Object.keys(results).map(wrapColumns);
  }
  return [];
};

export const DatatableBody = ({
  schema,
  data,
  showEdit,
  title,
  showDelete,
}) => {
  const sortedColumns = getColumns(schema, data);

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="table min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {sortedColumns.map((column, index) => (
              <DatatableHeader key={index} {...{ column }} />
            ))}
            {showEdit ? (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            ) : null}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data && data.length ? (
            data.map((document, index) => (
              <DatatableRow
                key={index}
                columns={sortedColumns}
                {...{ title, document, showEdit, showDelete }}
              />
            ))
          ) : (
            <DatatableEmpty />
          )}
        </tbody>
      </table>
    </div>
  );
};
