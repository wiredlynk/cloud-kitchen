import React from "react";
import { NavLink } from "@remix-run/react";
import { Menu, Transition } from "@headlessui/react";
import { Line, FormattedMessage } from "~/components";

/*
Note: `rest` is used to ensure auto-generated props from parent dropdown
components are properly passed down to MenuItem
*/
const Item = ({
  to,
  labelId,
  label,
  component,
  componentProps = {},
  itemProps,
  linkProps,
}) => {
  let menuComponent;
  const linkClassName =
    "block cursor-pointer px-4 py-2 text-base font-medium rounded-lg hover:shadow-xl hover:text-white hover:bg-primary dark:text-white transition";

  if (component) {
    menuComponent = React.cloneElement(component, componentProps);
  } else if (labelId) {
    menuComponent = <FormattedMessage id={labelId} />;
  } else {
    menuComponent = <span className={linkClassName}>{label}</span>;
  }

  return to ? (
    <Menu.Item>
      {({ active }) => (
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive
              ? `${linkClassName} bg-primary text-white dark:bg-gray-800 shadow-xl transition`
              : linkClassName
          }
          role="menuitem"
          {...linkProps}
        >
          {menuComponent}
        </NavLink>
      )}
    </Menu.Item>
  ) : (
    <Menu.Item>
      <span className={linkClassName} role="menuitem" {...itemProps}>
        {menuComponent}
      </span>
    </Menu.Item>
  );
};

const DropdownItems = ({ item }) => {
  if (item === "divider") {
    return <Line />;
  } else {
    return <Item {...item} />;
  }
};

export const Dropdown = ({
  trigger,
  menuItems,
  menuContents,
  ...dropdownProps
}) => {
  const menuBody = menuContents
    ? menuContents
    : menuItems.map((item, index) => (
        <DropdownItems key={index} {...{ item }} />
      ));

  return (
    <div className="relative">
      <Menu as="div" {...dropdownProps}>
        <>
          <Menu.Button
            className="rounded-lg flex items-center border-transparent focus:outline-none"
            id="user-menu"
            aria-expanded="false"
            aria-haspopup="true"
          >
            {trigger}
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-xl shadow-xl py-3 px-2 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-700 focus:outline-none">
              {menuBody}
            </Menu.Items>
          </Transition>
        </>
      </Menu>
    </div>
  );
};
