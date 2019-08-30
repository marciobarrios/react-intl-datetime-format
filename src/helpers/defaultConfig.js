import getUserLocale from "get-user-locale"

const defaultIntlConfig = {
  locale: getUserLocale(),
  options: {},
}

export { defaultIntlConfig }
