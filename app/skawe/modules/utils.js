import { canCreateField, canUpdateField } from "~/skawe/users/permissions";

/**
 * @summary Convert an underscore-separated string to dash-separated string
 * @param {String} str
 */
export const strToUnderscore = (str) => {
  return str.replaceAll(" ", "_").toLowerCase();
};

// add support for nested properties
export const deepValue = (obj, path) => {
  const pathArray = path.split(".");

  for (let i = 0; i < pathArray.length; i++) {
    obj = obj[pathArray[i]];
  }

  return obj;
};

/**
 * Get an array of all fields editable by a specific user for a given collection
 * @param {Object} user – the user for which to check field permissions
 */
export const getInsertableFields = function (schema, user) {
  const schemaKeys = Object.keys(schema);
  const fields = schemaKeys.filter((fieldName) => {
    const field = schema[fieldName];
    return canCreateField(user, field);
  });
  return fields;
};

/**
 * @method Mongo.Collection.getEditableFields
 * Get an array of all fields editable by a specific user for a given collection
 * @param {Object} user – the user for which to check field permissions
 */
export const getEditableFields = function (schema, user, document) {
  const schemaKeys = Object.keys(schema);
  const fields = schemaKeys.filter((fieldName) => {
    const field = schema[fieldName];
    return canUpdateField(user, field, document);
  });
  return fields;
};

export const getFormFields = (schema) => {
  // get all editable/insertable fields (depending on current form type)
  let publishedFields = {};
  Object.entries(schema).forEach(([key, value]) => {
    if (!value.hasOwnProperty("optional")) {
      publishedFields[key] = value;
    }
    return value.hasOwnProperty("optional");
  });

  return Object.keys(publishedFields); // prints array relevantFields  (4) ['title', 'content', 'image', 'department']
};

export const removeNullOrEmpty = (document) => {
  Object.keys(document).forEach((key) => {
    if (
      document[key] === null ||
      document[key] === undefined ||
      document[key] === ""
    ) {
      delete document[key];
    }
  });
};
