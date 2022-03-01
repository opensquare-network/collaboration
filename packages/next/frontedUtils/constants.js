export const FOOTER_ITEMS = [
  {
    label: "Product",
    items: [
      { name: "doTreasury", link: "https://www.dotreasury.com" },
      { name: "Statescan", link: "https://statescan.io" },
      { name: "Subsquare", link: "https://www.subsquare.io" },
      { name: "CoinAsk", link: "https://www.coinask.io" },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        name: "Lightpaper",
        link: "https://github.com/opensquare-network/papers",
      },
      {
        name: "Media Kits",
        link: "https://drive.google.com/drive/folders/1nA6PTJJYfnpvB8wu9cgQaHopMRM4bqQg?usp=sharing",
      },
    ],
  },
  {
    label: "Social Links",
    items: [
      {
        name: "Github",
        icon: "github.svg",
        link: "https://github.com/opensquare-network",
      },
      {
        name: "Telegram",
        icon: "telegram.svg",
        link: "https://t.me/opensquare",
      },
      {
        name: "Twitter",
        icon: "twitter.svg",
        link: "https://twitter.com/OpensquareN",
      },
      {
        name: "Subsocial",
        icon: "subsocial.svg",
        link: "https://app.subsocial.network/@opensquare",
      },
    ],
  },
  {
    label: "Contact",
    items: [
      { name: "Email", icon: "mail.svg", link: "mailto:hi@opensquare.network" },
    ],
  },
];

export const LIST_TAB_ITEMS = [
  {
    value: "all",
    name: "All Proposals",
  },
  {
    value: "active",
    name: "Active",
  },
  {
    value: "pending",
    name: "Pending",
    tooltip: "Waiting for the start date",
  },
  {
    value: "closed",
    name: "Closed",
  },
];

export const EmptyQuery = {
  total: 0,
  page: 1,
  pageSize: 10,
  items: [],
};

export const TOAST_TYPES = {
  SUCCESS: "Success",
  ERROR: "Error",
  INFO: "Info",
};
