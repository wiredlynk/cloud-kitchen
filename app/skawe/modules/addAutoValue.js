export const addAutoValue = async (options) => {
  const { document, getSchema } = options;
  const schema = getSchema.fields;

  /*
   * add autoValue
   */
  for (let fieldName of Object.keys(schema)) {
    try {
      let autoValue;
      if (schema[fieldName].add) {
        autoValue = schema[fieldName].add(document);
      }
      if (typeof autoValue !== "undefined") {
        document[fieldName] = autoValue;
      }
    } catch (e) {
      console.log(`// Autovalue error on field ${fieldName}`);
      console.log(e);
    }
  }

  return document;
};
