import DropdownSelector from "@osn/common-ui/es/DropdownSelector";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import BiasedVotingResult from "./biasedVotingResult";
import BalanceOfResult from "./balanceOfResult";
import QuadraticBalanceOfResult from "./quadraticBalanceOfResult";
import OnePersonOneVoteResult from "./onePersonOneVoteResult";
import Quorum from "./common/quorum";
import SocietyVoteResult from "./societyVoteResult";
import SocietyQuorum from "./common/societyQuorum";

const ChoiceWrapper = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--textPrimary);
`;

const SelectWrapper = styled.div`
  padding: 20px 0 8px;
`;

export default function StrategyResult({ data, voteStatus, space }) {
  const [index, setIndex] = useState("biased-voting");
  const { choiceTypes, componentMap } = useResultConfig(
    data,
    voteStatus,
    space,
  );

  useEffect(() => {
    setIndex(choiceTypes[0].value);
  }, [choiceTypes]);

  const { content, header } = useMemo(
    () => componentMap?.[index] || {},
    [componentMap, index],
  );

  return (
    <>
      {header}
      <SelectWrapper>
        <DropdownSelector
          value={index}
          onSelect={setIndex}
          options={choiceTypes}
        />
      </SelectWrapper>
      {content}
    </>
  );
}

const useResultConfig = (data, voteStatus, space) => {
  const { types, componentMap } = useMemo(() => {
    const types = [];
    const componentMap = {};

    if (voteStatus?.[0]?.biasedVoting) {
      types.push({
        label: "biased-voting",
        value: "biased-voting",
      });
      componentMap["biased-voting"] = {
        header: null,
        content: (
          <BiasedVotingResult
            proposal={data}
            space={space}
            voteStatus={voteStatus}
          />
        ),
      };
    }

    data?.weightStrategy?.map((strategy) => {
      if (strategy === "balance-of") {
        types.push({
          label: strategy,
          value: strategy,
        });
        componentMap[strategy] = {
          header: null,
          content: (
            <BalanceOfResult
              proposal={data}
              space={space}
              voteStatus={voteStatus}
            />
          ),
        };
      }

      if (strategy === "quadratic-balance-of") {
        types.push({
          label: strategy,
          value: strategy,
        });
        componentMap[strategy] = {
          header: null,
          content: (
            <QuadraticBalanceOfResult
              proposal={data}
              space={space}
              voteStatus={voteStatus}
            />
          ),
        };
      }

      if (strategy === "quorum-balance-of") {
        types.push({
          value: strategy,
          label: "balance-of",
        });
        componentMap[strategy] = {
          header: <Quorum proposal={data} space={space} />,
          content: (
            <BalanceOfResult
              proposal={data}
              space={space}
              voteStatus={voteStatus}
            />
          ),
        };
      }

      if (strategy === "quorum-quadratic-balance-of") {
        types.push({
          value: strategy,
          label: "quadratic-balance-of",
        });
        componentMap[strategy] = {
          header: <Quorum proposal={data} space={space} />,
          content: (
            <QuadraticBalanceOfResult
              proposal={data}
              space={space}
              voteStatus={voteStatus}
            />
          ),
        };
      }

      if (strategy === "one-person-one-vote") {
        types.push({
          label: strategy,
          value: strategy,
        });
        componentMap[strategy] = {
          header: null,
          content: (
            <OnePersonOneVoteResult proposal={data} voteStatus={voteStatus} />
          ),
        };
      }

      if (strategy === "society") {
        types.push({
          label: strategy,
          value: strategy,
        });
        componentMap[strategy] = {
          header: data?.networksConfig?.societyQuorum && (
            <SocietyQuorum proposal={data} />
          ),
          content: (
            <SocietyVoteResult proposal={data} voteStatus={voteStatus} />
          ),
        };
      }
    });

    return { types, componentMap };
  }, [data, space, voteStatus]);

  const choiceTypes = useMemo(
    () =>
      types.map(({ value, label }) => ({
        key: value,
        value: value,
        content: <ChoiceWrapper>{label || value}</ChoiceWrapper>,
      })),
    [types],
  );

  return {
    choiceTypes,
    componentMap,
  };
};
