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
  PENDING: "Pending",
};
