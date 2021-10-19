// import { validateProposal, createProposal } from "./viewfunc";
//
// test("validation a proposal before creating", () => {
//   const empty_proposal = {};
//   const proper_proposal = {
//     space: "polkadot",
//     title: "test",
//     content: "This is a test",
//     contentType: "markdown",
//     choiceType: "single",
//     choices: ["choice1", "choice2"],
//     startDate: (new Date()).getTime(),
//     endDate: (new Date()).getTime() + 86400 * 100,
//     snapshotHeight: 12345,
//     address: `some address`,
//   };
//   expect(validateProposal(empty_proposal)).toBe(`space must not be empty.`);
//   expect(validateProposal(proper_proposal)).toBe(false);
// });
//
// test("create a new proposal via calling API", () => {
//   const proper_proposal = {
//     space: "polkadot",
//     title: "test",
//     content: "This is a test",
//     contentType: "markdown",
//     choiceType: "single",
//     choices: ["choice1", "choice2"],
//     startDate: (new Date()).getTime(),
//     endDate: (new Date()).getTime() + 86400 * 100,
//     snapshotHeight: 12345,
//     address: `some address`,
//   };
//   expect(createProposal(empty_proposal)).toBe(Promise);
// });
