# ably
Provides a framework to perform A/B tests in the browser. This is still work in progress.

[![Build Status](https://travis-ci.org/vgno/ably.svg)](https://travis-ci.org/vgno/ably)

## Usage example

Call `ably.addTest` and pass it an array with configuration of the test you want to run.

```js
ably.addTest(
    {
        name: 'button-color',
        randomizer: new MathRandomRandomizer([
            'red': 40, 
            'green': 60
        ]),
        scope: new CookieScope()
    }
);
```

## APIs

Ably exposes three APIs: JS, HTML and CSS.

![Ably interface](docs/ably-interface.png)

### JS API

The JS API allows you to attach event handlers to different variants of tests.

```js
ably
    .when('button-color', 'red', function (button) {
        button.style.backgroundColor = '#ff0000';
    })
    .when('button-color', 'green', function (button) {
        button.style.backgroundColor = '#00ff00';
    })
    .run(document.getElementById('purchase-button'));
```

### HTML & CSS APIs

Purpose:

1. Make it possible to write an A/B test entirely in HTML or CSS without writing (almost) any Javascript.
2. Help avoid the flickering effect when showing/hiding/manipulating DOM elements via Javascript after the DOM is ready.

This is achieved by adding the selected variants as classes to the `body` element. This makes the browser able to style page elements early, before the entire DOM is loaded.

The variant classes will be added to the `body` element by Ably. The routine that adds those classes needs to be invoked as early as possible, preferably right after the opening `body` tag.

#### HTML API

HTML:

```html
<!-- Ably automatically appends the selected variant as a class to the body element -->
<body class="ably-button-text-buy">

  <!-- You add class names to variants you want to show/hide -->
  <button class="ably-button-text-buy">
    Buy Now!
  </button>

  <button class="ably-button-text-subscribe">
    Subscribe!
  </button>

</body>
```

CSS:

```css
/*
 * CSS autogenerated by Ably
 */
body[class*="ably-button-text"] *[class*="ably-button-text"] {
    display: none;
}

body.ably-button-text-buy *[class*="ably-button-text-buy"] {
    display: initial;
}

body.ably-button-text-subscribe *[class*="ably-button-text-subscribe"] {
    display: initial;
}
```

#### CSS API

HTML:

```html
<!-- Ably automatically appends the selected variant as a class to the body element -->
<body class="ably-button-color-red">

  <button id="buy-now-button">
    Buy Now!
  </button>

</body>
```

CSS:

```css
/*
 * You specify different CSS rules for variants
 */
body.ably-button-color-red #buy-now-button
    background-color: #ff0000;
}

body.ably-button-color-green #buy-now-button
    background-color: #00ff00;
}
```

## Architecture

Read more about the architecture in [Architecture](docs/architecture.md).
