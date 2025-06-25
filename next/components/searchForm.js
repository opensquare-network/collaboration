import { Input, noop } from "@osn/common-ui";
import { SystemSearch } from "@osn/icons/opensquare";
import { useCallback, useEffect, useState, useMemo } from "react";
import { debounce } from "lodash-es";
import { LoadingIcon } from "@osn/common-ui";

export default function SearchForm({
  placeholder = "Search",
  onInput = noop,
  loading = false,
  debounceMs = 500,
}) {
  const [input, setInput] = useState("");

  const debouncedOnInput = useMemo(
    () => debounce(onInput, debounceMs),
    [debounceMs, onInput],
  );

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
    <form
      className="[&>div]:w-full flex items-center gap-2 w-[200px]! max-sm:w-full"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        name="search"
        value={input}
        onInput={handleInput}
        className="w-full"
        placeholder={placeholder}
        suffix={
          <div className="flex items-center justify-center w-4 h-4">
            <SearchSuffix loading={loading} />
          </div>
        }
      />
    </form>
  );
}

function SearchSuffix({ loading = false }) {
  if (loading) {
    return <LoadingIcon className="w-4 h-4 text-textTertiary" />;
  }
  return <SystemSearch className="w-4 h-4 text-textTertiary" />;
}
