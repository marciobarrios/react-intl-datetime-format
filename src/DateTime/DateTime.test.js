import React from "react"
import { DateTime } from "./Datetime"
import { render } from "@testing-library/react"
import { IntlProvider } from "../IntlProvider"

const DATE_STRING = "3 dec 1983 14:00"
const DATE_INSTANCE = new Date(2012, 11, 20, 3, 0, 0)

// Note: ICU data is limited in the default Node build, so I'm only using "en-US" locale for tests
// More info: https://stackoverflow.com/questions/55183776/different-behaviour-of-intl-numberformat-in-node-and-browser

describe("DateTime without a config Provider", () => {
  test("formats a date for a string with the default config", () => {
    const { container } = render(<DateTime>{DATE_STRING}</DateTime>)

    expect(container.textContent).toBe("12/3/1983")
  })

  test("formats a date and time for a string", () => {
    const { container } = render(
      <DateTime
        month="long"
        weekday="short"
        day="numeric"
        second="numeric"
        hour="numeric"
        minute="numeric"
      >
        {DATE_STRING}
      </DateTime>
    )

    expect(container.textContent).toBe("Sat, December 3, 2:00:00 PM")
  })

  test("formats a date and time for a Date instance with the default config", () => {
    const { container } = render(<DateTime>{DATE_INSTANCE}</DateTime>)

    expect(container.textContent).toBe("12/20/2012")
  })

  test("formats a date and time based on a Date instance", () => {
    const { container } = render(
      <DateTime
        month="long"
        weekday="short"
        day="numeric"
        second="numeric"
        hour="numeric"
        minute="numeric"
      >
        {DATE_INSTANCE}
      </DateTime>
    )

    expect(container.textContent).toBe("Thu, December 20, 3:00:00 AM")
  })

  test("formats a date with a custom tag", () => {
    const { container } = render(<DateTime as="span">{DATE_STRING}</DateTime>)

    expect(container.textContent).toBe("12/3/1983")
    expect(container.firstChild.nodeName).toBe("SPAN")
  })

  test("doesn't render if children is not valid", () => {
    const { container } = render(<DateTime>Foo Bar</DateTime>)

    expect(container.textContent).toBe("")
  })
})

describe("DateTime with a config Provider", () => {
  const config = {
    locale: "en-US",
    options: {
      month: "long",
      weekday: "short",
      day: "numeric",
    },
  }

  test("formats a date with Provider config", () => {
    const { container } = render(
      <IntlProvider config={config}>
        <DateTime>{DATE_INSTANCE}</DateTime>
      </IntlProvider>
    )

    expect(container.textContent).toBe("Thu, December 20")
  })

  test("formats a date overwritting context with props", () => {
    const props = {
      dateStyle: "medium",
      timeStyle: "medium",
      localeMatcher: "best fit",
      hour12: true,
      hourCycle: "h12",
      formatMatcher: "best fit",
      weekday: "short",
      era: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    }

    const { container } = render(
      <IntlProvider config={config}>
        <DateTime {...props}>{DATE_INSTANCE}</DateTime>
      </IntlProvider>
    )

    expect(container.textContent).toBe(
      "Thu, December 20, 2012 AD, 3:00:00 AM GMT+1"
    )
  })
})
