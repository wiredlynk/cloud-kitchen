/**
 * @summary groups object
 */
export const groups = {};

/**
 * @summary Group class
 */
class Group {
  constructor() {
    this.actions = [];
  }

  can(actions) {
    actions = Array.isArray(actions) ? actions : [actions];
    this.actions = this.actions.concat(actions.map((a) => a.toLowerCase()));
  }

  cannot(actions) {
    actions = Array.isArray(actions) ? actions : [actions];
    this.actions = this.actions.filter(
      (x) => !actions.includes(x.toLowerCase())
    );
  }
}

/**
 * @summary create a new group
 * @param {String} groupName
 */
export const createGroup = (groupName) => {
  groups[groupName] = new Group();
};

/**
 * @summary get a list of a user's groups
 * @param {Object} user
 */
export const getGroups = (user, document) => {
  let userGroups = ["guests"];

  if (user) {
    userGroups.push("members");

    if (document && owns(user, document)) {
      userGroups.push("owners");
    }

    if (user.groups) {
      // custom groups
      userGroups = userGroups.concat(user.groups);
    }

    if (isAdmin(user)) {
      // admin
      userGroups.push("admins");
    }
  }

  return userGroups;
};

/**
 * @summary get a list of all the actions a user can perform
 * @param {Object} user
 */
export const getActions = (user) => {
  let userGroups = getGroups(user);
  if (!userGroups.includes("guests")) {
    // always give everybody permission for guests actions, too
    userGroups.push("guests");
  }
  let groupActions = userGroups.map((groupName) => {
    // note: make sure groupName corresponds to an actual group
    const group = groups[groupName];
    return group && group.actions;
  });
  return [...new Set(groupActions.reduce((a, b) => a.concat(b), []))];
};

/**
 * @summary check if a user is a member of a group
 * @param {Array} user
 * @param {String} group or array of groups
 */
export const isMemberOf = (user, groupOrGroups, document) => {
  const group = Array.isArray(groupOrGroups) ? groupOrGroups : [groupOrGroups];
  const arrGroup = [getGroups(user, document), group];
  return arrGroup.reduce((a, b) => a.filter((c) => b.includes(c))).length > 0;
};

/**
 * @summary check if a user can perform at least one of the specified actions
 * @param {Object} user
 * @param {String/Array} action or actions
 */
export const canDo = (user, actionOrActions) => {
  const authorizedActions = getActions(user);
  const actions = Array.isArray(actionOrActions)
    ? actionOrActions
    : [actionOrActions];

  const arrGroup = [authorizedActions, actions];
  return (
    isAdmin(user) ||
    arrGroup.reduce((a, b) => a.filter((c) => b.includes(c))).length > 0
  );
};

/**
 * @summary Check if a user owns a document
 * @param {Object|string} userOrUserId - The user or their userId
 * @param {Object} document - The document to check (post, comment, user object, etc.)
 */
export const owns = function (user, document) {
  try {
    if (document.userId) {
      // case 1: document is a post or a comment, use userId to check
      return user.id === document.userId;
    } else if (document.user) {
      // case 2: use user.id to check
      return user.id === document.user.id;
    } else {
      // case 3: document is a user, use id to check
      return user.id === document.id;
    }
  } catch (e) {
    return false; // user not logged in
  }
};

/**
 * @summary Check if a user is an admin
 * @param {Object|string} userOrUserId - The user or their userId
 */
export const isAdmin = async (user) => {
  try {
    return !!user && !!user.isAdmin;
  } catch (e) {
    return false; // user not logged in
  }
};

/**
 * @summary Check if a user can submit a field
 * @param {Object} user - The user performing the action
 * @param {Object} field - The field being edited or inserted
 */
export const canCreateField = function (user, field) {
  const canCreate = field?.canCreate;

  if (canCreate) {
    if (typeof canCreate === "string") {
      // if canCreate is just a string, we assume it's the name of a group and pass it to isMemberOf
      // note: if canCreate is 'guests' then anybody can create it
      return canCreate === "guests" || isMemberOf(user, canCreate);
    } else if (Array.isArray(canCreate) && canCreate.length > 0) {
      // if canCreate is an array, we do a recursion on every item and return true if one of the items return true
      return canCreate.some((group) =>
        canCreateField(user, { canCreate: group })
      );
    }
  }
  return false;
};

/** @function
 * Check if a user can edit a field
 * @param {Object} user - The user performing the action
 * @param {Object} field - The field being edited or inserted
 * @param {Object} document - The document being edited or inserted
 */
export const canUpdateField = function (user, field, document) {
  const canUpdate = field.canUpdate;

  if (canUpdate) {
    if (typeof canUpdate === "string") {
      // if canUpdate is just a string, we assume it's the name of a group and pass it to isMemberOf
      // note: if canUpdate is 'guests' then anybody can create it
      return canUpdate === "guests" || isMemberOf(user, canUpdate, document);
    } else if (Array.isArray(canUpdate) && canUpdate.length > 0) {
      // if canUpdate is an array, we look at every item and return true if one of the items return true
      return canUpdate.some((group) =>
        canUpdateField(user, { canUpdate: group }, document)
      );
    }
  }
  return false;
};

/**
 * @summary initialize the 3 out-of-the-box groups
 */
createGroup("guests"); // non-logged-in users
createGroup("members"); // regular users
createGroup("admins"); // admin users
createGroup("kitchen"); // kitchen
createGroup("kitchen-admin"); // kitchen admin user
createGroup("hotel"); // hotel

const guestsActions = ["users.create.new"];
groups.guests.can(guestsActions);

const membersActions = ["users.update.own"];
groups.members.can(membersActions);

const adminActions = [
  "users.create.new",
  "users.update.all",
  "users.delete.all",
  "setting.update",
];
groups.admins.can(adminActions);
