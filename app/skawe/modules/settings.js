import appSettings from "~/settings";

export const Settings = {};

export function registerSetting({ settingName, defaultValue, description }) {
  Settings[settingName] = { defaultValue, description };
}

export function getSetting(settingName, defaultValue) {
  let setting;

  // if a default value has been registered using registerSetting, use it
  if (typeof defaultValue === "undefined" && Settings[settingName])
    defaultValue = Settings[settingName].defaultValue;

  const setSettings = appSettings && appSettings[settingName];
  setting = typeof setSettings !== "undefined" ? setSettings : defaultValue;

  return setting;
}
