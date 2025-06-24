import tw from "tailwind-styled-components";
import { Input, noop } from "@osn/common-ui";
import { SystemSearch } from "@osn/icons/opensquare";
import { useCallback, useEffect, useState, useMemo } from "react";
import { debounce } from "lodash-es";
import LoadingField from "./loadingField";

const Wrapper = tw.form`
  w-[200px]!
  max-sm:w-full
  flex items-center gap-2
`;

export default function SearchForm({
  placeholder = "Search",
  onInput = noop,
  loading = false,
}) {
  const [input, setInput] = useState("");

  const debouncedOnInput = useMemo(() => debounce(onInput, 500), [onInput]);

  useEffect(() => {
    debouncedOnInput(input);
    return () => {
      debouncedOnInput.cancel();
    };
  }, [input, debouncedOnInput]);

  const handleInput = useCallback((evt) => {
    setInput(evt.target.value);
  }, []);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  }, []);

  return (
    <Wrapper className="[&>div]:w-full" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="search"
        value={input}
        onInput={handleInput}
        className="w-full"
        placeholder={placeholder}
        suffix={
          <div className="flex items-center justify-center w-4 h-4">
            {loading ? (
              <LoadingField
                isLoading={loading}
                className="w-4 h-4 text-textTertiary"
              />
            ) : (
              <SystemSearch className="w-4 h-4 text-textTertiary" />
            )}
          </div>
        }
      />
    </Wrapper>
  );
}
