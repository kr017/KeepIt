import SvgIcon from "@material-ui/core/SvgIcon";

export function SvgIcons(props) {
  switch (props.label) {
    case "TRASH":
      return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
          <path d="M20 6h-3.155a.949.949 0 0 0-.064-.125l-1.7-2.124A1.989 1.989 0 0 0 13.519 3h-3.038a1.987 1.987 0 0 0-1.562.75l-1.7 2.125A.949.949 0 0 0 7.155 6H4a1 1 0 0 0 0 2h1v11a2 2 0 0 0 1.994 2h10.011A2 2 0 0 0 19 19V8h1a1 1 0 0 0 0-2zm-9.519-1h3.038l.8 1H9.681zm6.524 14H7V8h10z" />
          <path d="M14 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1zM10 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z" />
        </SvgIcon>
      );

    case "ARCHIVE":
      return (
        <SvgIcon viewBox="0 0 48 48" {...props}>
          <path d="M41.09 10.45l-2.77-3.36c-.56-.66-1.39-1.09-2.32-1.09h-24c-.93 0-1.76.43-2.31 1.09l-2.77 3.36c-.58.7-.92 1.58-.92 2.55v25c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4v-25c0-.97-.34-1.85-.91-2.55zm-17.09 24.55l-11-11h7v-4h8v4h7l-11 11zm-13.75-25l1.63-2h24l1.87 2h-27.5z" />
          <path d="M0 0h48v48h-48z" fill="none" />{" "}
        </SvgIcon>
      );

    case "NOTES":
      return (
        <SvgIcon viewBox="0 0 512 512" {...props}>
          <g>
            <g>
              <path d="m256,92.3c-74.2,0-127.8,55.3-136.3,114.7-5.3,39.6 7.5,78.2 34.1,107.4 23.4,25 36.2,58.4 36.2,92.8l-.1,54.2c0,21.9 18.1,39.6 40.5,39.6h52.2c22.4,0 40.5-17.7 40.5-39.6l.1-54.2c0-35.4 11.7-67.8 34.1-90.7 24.5-25 37.3-57.3 37.3-90.7-0.1-74.1-63-133.5-138.6-133.5zm46.8,369.1c0,10.4-8.5,18.8-19.2,18.8h-52.2c-10.7,0-19.2-8.3-19.2-18.8v-24h90.5v24zm39.6-159.5c-26.6,27.1-40.5,64.6-40.5,105.3v9.4h-90.5v-9.4c0-38.6-16-77.1-42.6-106.3-23.4-25-33-57.3-28.8-90.7 7.5-50 54-97 116.1-97 65,0 117.2,51.1 117.2,112.6 0,28.1-10.7,55.2-30.9,76.1z" />
              <rect width="21.3" x="245.3" y="11" height="50" />
              <polygon points="385.1,107.4 400,122.3 436.5,87.2 421.5,72.3   " />
              <rect width="52.2" x="448.8" y="236.2" height="20.9" />
              <rect width="52.2" x="11" y="236.2" height="20.9" />
              <polygon points="90.1,72.2 75.1,87.1 111.6,122.2 126.5,107.3   " />
            </g>
          </g>{" "}
        </SvgIcon>
      );
    default:
      return null;
  }
}