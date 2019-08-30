import React from "react"
import PropTypes from "prop-types"
import { useIntl } from "../IntlProvider"
import { defaultIntlConfig } from "../helpers"

const DateTime = ({
  as: Tag = "div",
  locale,
  children,
  dateStyle,
  timeStyle,
  localeMatcher,
  timeZone,
  hour12,
  hourCycle,
  formatMatcher,
  weekday,
  era,
  year,
  month,
  day,
  hour,
  minute,
  second,
  timeZoneName,
}) => {
  const context = useIntl()

  const localeFromContext = context && context.config.locale
  const optionsFromContext = context && context.config.options

  const isDefined = key => key !== undefined

  // Only keep props that are not undefined
  const optionsFromProps = {
    ...(isDefined(dateStyle) && { dateStyle }),
    ...(isDefined(timeStyle) && { timeStyle }),
    ...(isDefined(localeMatcher) && { localeMatcher }),
    ...(isDefined(timeZone) && { timeZone }),
    ...(isDefined(hour12) && { hour12 }),
    ...(isDefined(hourCycle) && { hourCycle }),
    ...(isDefined(formatMatcher) && { formatMatcher }),
    ...(isDefined(weekday) && { weekday }),
    ...(isDefined(era) && { era }),
    ...(isDefined(year) && { year }),
    ...(isDefined(month) && { month }),
    ...(isDefined(day) && { day }),
    ...(isDefined(hour) && { hour }),
    ...(isDefined(minute) && { minute }),
    ...(isDefined(second) && { second }),
    ...(isDefined(timeZoneName) && { timeZoneName }),
  }

  const setLocale = locale || localeFromContext || defaultIntlConfig.locale
  const setOptions = {
    ...optionsFromContext,
    ...optionsFromProps,
  }

  const date = children ? new Date(children) : new Date()
  const formattedDate = new Intl.DateTimeFormat(setLocale, setOptions).format(
    date
  )

  return <Tag>{formattedDate}</Tag>
}

DateTime.propTypes = {
  /** Date to format, could be a string , if it's empty will take the current date */
  children: PropTypes.node,
  /** A string with a BCP 47 language tag, or an array of such strings. e.g. "en-US". If you don't provide any locale via Context Provider or props, the locally will be guessed from the browser */
  locale: PropTypes.string,
  /** Date formatting style */
  dateStyle: PropTypes.oneOf(["full", "clongode", "medium", "short"]),
  /** Time formatting style */
  timeStyle: PropTypes.oneOf(["full", "clongode", "medium", "short"]),
  /** The locale matching algorithm to use */
  localeMatcher: PropTypes.oneOf(["lookup", "best fit"]),
  /** The time zone to use, the default is the runtime's default time zone */
  timeZone: PropTypes.string,
  /** Whether to use 12-hour time (as opposed to 24-hour time), the default is locale dependent */
  hour12: PropTypes.bool,
  /** The hour cycle to use */
  hourCycle: PropTypes.oneOf(["h11", "h12", "h23", "h24"]),
  /** The format matching algorithm to use, the default is "best fit" */
  formatMatcher: PropTypes.oneOf(["basic", "best fit"]),
  /** The representation of the weekday: "long" (e.g., Thursday), "short" (e.g., Thu), "narrow" (e.g., T) */
  weekday: PropTypes.oneOf(["long", "short", "narrow"]),
  /** The representation of the era. "long" (e.g., Anno Domini), "short" (e.g., AD), "narrow" (e.g., A)*/
  era: PropTypes.oneOf(["long", "short", "narrow"]),
  /** The representation of the year: "numeric" (e.g., 2012), "2-digit" (e.g., 12) */
  year: PropTypes.oneOf(["numeric", "2-digit"]),
  /** The representation of the month: "numeric" (e.g., 2), "2-digit" (e.g., 02), "long" (e.g., March), "short" (e.g., Mar), "narrow" (e.g., M) */
  month: PropTypes.oneOf(["numeric", "2-digit", "long", "short", "narrow"]),
  /** The representation of the day: "numeric" (e.g., 1), "2-digit" (e.g., 01) */
  day: PropTypes.oneOf(["numeric", "2-digit"]),
  /** The representation of the hour */
  hour: PropTypes.oneOf(["numeric", "2-digit"]),
  /** The representation of the minute */
  minute: PropTypes.oneOf(["numeric", "2-digit"]),
  /** The representation of the second */
  second: PropTypes.oneOf(["numeric", "2-digit"]),
  /** The representation of the time zone name: "long" (e.g., British Summer Time), "short" (e.g., GMT+1) */
  timeZoneName: PropTypes.oneOf(["long", "short"]),
}

export { DateTime }
