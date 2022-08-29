import { useState, useEffect } from "react";
import { Text, Row, FormattedMessage } from "~/components";
import { DatatableBody } from "./DatatableBody";
import { DatatableAbove } from "./DatatableDefaultCell";

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

export const DataTable = (props, context) => {
  const { title } = props;

  const [searchValue, setSearchValue] = useState();
  const [search, setSearch] = useState();

  const updateSearch = (e) => {
    e.persist();
    e.preventDefault();

    const searchInputValue = e.target.value;

    setSearchValue(searchInputValue);
    delay(() => {
      setSearch(searchInputValue);
      // this.updateQueryParameter('search', searchInputValue);
    }, 700);
  };

  return (
    <Row spacing="top-medium bottom-medium">
      <div>
        <Text variant="overline">
          <FormattedMessage id={title} />
        </Text>
        <DatatableAbove
          {...props}
          searchValue={searchValue}
          updateSearch={updateSearch}
        />
        <DatatableBody {...props} />
      </div>
    </Row>
  );
};
