# react-intl-datetime-format

Tiny React component wrapping the ECMAScript Internationalization API with sane defaults to format dates and times.

To see in detail the component `Date` with the list of props and examples please [check the documentation site](https://react-intl-datetime-format.netlify.com).

You can also play with `react-intl-datetime-format` in a [CodeSandbox]().

## Features

- Effortless format dates and times for different locales
- Relies in the standard [Intl.DateTimeFormat constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)
- Possibility to use it as an standalone React Component using props to configure it
- Possibility to use a general config using a React Context Provider
- Detects automatically the browser language as a default locale
- Exposes a function to update the Provider config
- Ability to render a date or a time with any html tag
- Props match [Intl.DateTimeFormat constructor arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters)

## Support

- [Works in any modern browsers, and IE >= 11](https://caniuse.com/#feat=internationalization)

## Installation

```shell
npm i react-intl-datetime-format
```

## Usage

This is the easiest way to use `Date` formatter component:

```js
import { Date } from "react-intl-datetime-format";

// renders 12/3/1983
const Foo = () => <Date locale="de-DE">{new Date("03 dec 1983")}</Date>;
```

You don't even need to pass a `locale` prop, by default it will try guess the locale from the browser.

## Recommended usage with a React Context Provider

The recommended way to use it would be with a Context.Provider, this will allow you to have a global configuration so you don't need to pass props every time you format a date or time.

A provider `IntlProvider` is exposed with a default config, but you can you set your own config and use it in your `App` component.

```js
// In your App.js or similar...
import { IntlProvider } from "react-intl-datetime-format";

const intlConfig = {
  locale: "en-US",
  options: {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short"
  }
};

const App = () => <IntlProvider config={intlConfig}>...</IntlProvider>;

// In any other part of your code
import { DateTime } from "react-intl-datetime-format";

const date = new Date(2012, 11, 20, 3, 0, 0)

const HelloWorld = () => (
  // renders "December 20, 2012, 4:00:00 AM GMT+1" (based on the provider config)
  <DateTime>{date}</DateTime>
);
```

The configuration object that `IntlProvider` expects is basically matching [the arguments from Intl.DateTimeFormat constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters).
