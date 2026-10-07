import type { ParentProps } from "solid-js";

// The document shell (the index.html replacement), picked up by the
// src/Document.* convention; it must render the full <html> and ships no
// client JS.

export default function Document(props: ParentProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fontsapi.zeoseven.com/570/main/result.css"
          rel="stylesheet"
          as="style"
          crossorigin
        />
        <noscript>
          <link rel="stylesheet" href="https://fontsapi.zeoseven.com/570/main/result.css" />
        </noscript>
        <title>Jarona It</title>
      </head>
      <body style="background-color:black" class="font-sans font-not-papyrus">
        {props.children}
      </body>
    </html>
  );
}
