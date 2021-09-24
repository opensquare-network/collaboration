export const DEFAULT_KUSAMA_NODE_URL = "wss://kusama.elara.patract.io";
export const DEFAULT_KUSAMA_NODES = [
  {
    name: "Parity",
    url: "wss://kusama-rpc.polkadot.io",
  },
  {
    name: "OnFinality",
    url: "wss://kusama.api.onfinality.io/public-ws",
  },
  {
    name: "Patract Elara",
    url: "wss://kusama.elara.patract.io",
  },
];

export const DEFAULT_POLKADOT_NODE_URL = "wss://rpc.polkadot.io/";
export const DEFAULT_POLKADOT_NODES = [
  {
    name: "Parity",
    url: "wss://rpc.polkadot.io/",
  },
  {
    name: "OnFinality",
    url: "wss://polkadot.api.onfinality.io/public-ws",
  },
  {
    name: "Patract Elara",
    url: "wss://polkadot.elara.patract.io/",
  },
];

export const FOOTER_ITEMS = [
  {
    label: "Product",
    items: [
      { name: "CoinAsk", link: "https://www.coinask.io/" },
      { name: "doTreasury", link: "https://www.dotreasury.com/" },
      { name: "statescan" },
    ],
  },
  {
    label: "Resources",
    items: [{ name: "Lightpaper" }, { name: "Media Kits" }],
  },
  {
    label: "Social Links",
    items: [
      { name: "Github", icon: "github.svg" },
      { name: "Telegram", icon: "telegram.svg" },
      { name: "Twitter", icon: "twitter.svg" },
      { name: "Subsocial", icon: "subsocial.svg" },
    ],
  },
  {
    label: "Contact",
    items: [{ name: "Email", icon: "mail.svg" }],
  },
];

export const SPACE_ITEMS = [
  { icon: "polkadot.svg", name: "Polkadot", symbol: "DOT", active: 5 },
  { icon: "kusama.svg", name: "Kusama", symbol: "KSM", active: 5 },
  { icon: "karura.svg", name: "Karura", active: 5 },
  { icon: "khala.svg", name: "Khala", active: 5 },
  { name: "XXX" },
];

export const POST_ITEMS = [
  {
    title: "Sit semper pretium enim, quisque aenean euismod odio.",
    author: "Butterbean",
    time: "End in 2 days",
    status: "Active",
  },
  {
    title:
      "Ut dignissim ornare eu neque id. Facilisis eget blandit leo quis ut auctor.",
    author: "Shogun",
    time: "End in 2 days",
    status: "Active",
  },
  {
    title:
      "Fermentum viverra lorem diam integer sodales feugiat nunc purus. Nullam vitae venenatis maecenas mi. Ac mauris id magna elementum. Lectus gravida pellentesque vel proin bibendum cursus accumsan, mattis.",
    author: "TheGrimReaper",
    time: "End in 2 days",
    status: "Active",
  },
];

export const LIST_NAV_ITEMS = [
  { name: "Space", link: "/" },
  { name: "Kusama" },
];

export const DETAIL_NAV_ITEMS = [
  { name: "Space", link: "/" },
  { name: "Kusama", link: "/list", back: true },
  { name: "Prososal" },
];

export const LIST_TAB_ITEMS = ["All Proposals", "Active", "Pending", "Closed"];

export const LIST_POST_ITEMS = [
  {
    title: "Sit semper pretium enim, quisque aenean euismod odio.",
    author: "Butterbean",
    time: "End in 2 days",
    status: "Active",
  },
  {
    title:
      "Ut dignissim ornare eu neque id. Facilisis eget blandit leo quis ut auctor.",
    author: "Shogun",
    time: "End in 2 days",
    status: "End",
  },
  {
    title:
      "Ipsum mattis nec etiam in maecenas commodo lorem. Non porta dignissim nulla ornare.",
    author: "TheChief",
    time: "End in 2 days",
    status: "End",
  },
  {
    title:
      "Fermentum viverra lorem diam integer sodales feugiat nunc purus. Nullam vitae venenatis maecenas mi. Ac mauris id magna elementum. Lectus gravida pellentesque vel proin bibendum cursus accumsan, mattis.",
    author: "TheGrimReaper",
    time: "End in 2 days",
    status: "End",
  },
];

export const TIMELINE_ITEMS_1 = [
  { name: "Created", time: "Aug 26th, 2021 - 6:45 am (UTC)" },
  { name: "Start", time: "Aug 26th, 2021 - 6:45 am (UTC)" },
  { name: "Active", active: true },
];

export const TIMELINE_ITEMS_2 = [
  { name: "Created", time: "Aug 26th, 2021 - 6:45 am (UTC)" },
  { name: "Start", time: "Aug 26th, 2021 - 6:45 am (UTC)" },
  { name: "End", time: "Aug 26th, 2021 - 6:45 am (UTC)" },
];

export const VOTE_ITEMS = [
  {
    author: "15kU...2i86",
    vote: "XXXXX",
    value: "100.05 KSM",
    content:
      "Mauris cum ac ut eu pellentesque arcu. Habitant cursus porttitor feugiat proin. Maecenas enim tristique fermentum parturient nisi, nulla sit leo.",
  },
  { author: "15kU...2i86", vote: "XXXXX", value: "100.05 KSM" },
  { author: "15kU...2i86", vote: "XXXXX", value: "100.05 KSM" },
];

export const DISCUSSION_ITEMS = [
  {
    author: "15kU...2i86",
    time: "2 days ago",
    content:
      "Mauris cum ac ut eu pellentesque arcu. Habitant cursus porttitor feugiat proin. Maecenas enim tristique fermentum parturient nisi, nulla sit leo.",
  },
  {
    author: "Butterbean",
    time: "2 days ago",
    content: "Mattis mollis at cum a ornare porttitor aliquam nunc, mi.",
  },
  {
    author: "15kU...2i86",
    time: "2 days ago",
    content:
      "Amet, eget orci faucibus at egestas nibh sed parturient enim. Libero nullam et egestas vel a. Egestas bibendum consequat non sed ac malesuada sed orci. Mauris nibh tempus in dolor.",
  },
];
