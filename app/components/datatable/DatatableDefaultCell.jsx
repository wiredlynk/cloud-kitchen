import { FormattedMessage, Button, Input } from "~/components";

/*
 * DatatableAbove Component
 */
export const DatatableAbove = (props) => (
  <div className="flex items-center space-x-2">
    {props.showSearch && <DatatableAboveLeft {...props} />}
    {props.showNew && <DatatableAboveRight {...props} />}
  </div>
);

const DatatableAboveLeft = (props) => (
  <Input layout="inputOnly" name="search..." />
);

const DatatableAboveRight = (props) => {
  const title = props.title.toLowerCase();
  const newLink = `/admin/${title}/list/new`;

  return (
    <Button className="mb-4" href={newLink}>
      <FormattedMessage id="datatable-new" />
    </Button>
  );
};

// DatatableCell
const DatatableCell = ({ column, document, ...rest }) => {
  return (
    <td
      className={`px-6 py-4 text-sm font-medium text-gray-900 datatable-item-${column
        .toLowerCase()
        .replace(/\s/g, "-")}`}
    >
      <div dangerouslySetInnerHTML={{ __html: document[column] }} />
    </td>
  );
};

// ActionButtons
const ActionButtons = ({ showEdit, showDelete, title, document, ...rest }) => {
  const url = title.toLowerCase();
  const editLink = `/admin/${url}/list/${document.id}/edit`;
  const deleteLink = `/admin/${url}/list/${document.id}/delete`;

  return (
    <td className="px-6 py-4 text-sm font-medium text-gray-900 datatable-item-edit">
      {showEdit ? (
        <Button size="small" href={editLink}>
          <FormattedMessage id="datatable-edit" />
        </Button>
      ) : null}
      {showDelete ? (
        <Button size="small" className="ml-2" href={deleteLink}>
          <FormattedMessage id="datatable-delete" />
        </Button>
      ) : null}
    </td>
  );
};

// DatatableHeader
export const DatatableHeader = ({ column }) => {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider datatable-header-${column.name}`}
    >
      <div className="flex">
        <FormattedMessage id={column} />
      </div>
    </th>
  );
};

// DatatableRow
export const DatatableRow = (props) => {
  const { columns, document } = props;

  return (
    <tr>
      {columns.map((column, index) => (
        <DatatableCell key={index} {...{ column, document }} />
      ))}
      <ActionButtons {...props} />
    </tr>
  );
};

export const DatatableEmpty = () => (
  <tr>
    <td colSpan="99" className="px-6 py-3 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 text-center">
        <FormattedMessage id="datatable-empty" />
      </div>
    </td>
  </tr>
);
