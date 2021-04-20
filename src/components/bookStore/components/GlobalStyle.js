/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

export const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
        /* outline: 1px black solid; */
      }

      button {
        cursor: pointer;
        user-select: none;
        color: inherit;
        letter-spacing: inherit;
        font-family: inherit;
        appearance: none;
        background: none;
        box-shadow: none;
        border: 0px;
        margin: 0px;
        padding: 0px;
      }

      button * {
        position: relative;
        top: 0px;
        left: 0px;
      }

      ul,
      ol {
        list-style-type: none;
        margin: 0px;
        padding: 0px;
      }

      li {
        line-height: initial;
      }
      h1,
      h2,
      h3,
      h4,
      button,
      input,
      p,
      span {
        letter-spacing: -0.03em;
      }
      a {
        color: inherit;
        letter-spacing: inherit;
        font-family: inherit;
        cursor: pointer;
      }
      a:link,
      a:visited {
        text-decoration: none;
      }

      .ButtonWrapper li + li {
        margin-left: 6px;
      }

      .ThumbnailWrapper::after {
        display: block;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.2) 0, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0.2) 100%);
        border: solid 1px rgba(0, 0, 0, 0.1);
        content: "";
      }

      .BookCarouselList > li + li {
        margin-left: 22px;
      }
    `}
  />
);
