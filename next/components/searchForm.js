import { cn, Input } from "@osn/common-ui";
import { SystemSearch } from "@osn/icons/opensquare";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SearchForm({ placeholder = "Search" }) {
  const router = useRouter();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (router.query.search) {
      setInput(router.query.search);
    }
  }, [router.query.search]);

  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      const query = { ...router.query };
      delete query.page;
      delete query.search;

      if (input) {
        query.search = input;
      }

      router.push({
        pathname: router.pathname,
        query,
      });
    },
    [router, input],
  );

  const handleInput = useCallback((evt) => {
    setInput(evt.target.value);
  }, []);

  return (
    <form
      className="[&>div]:w-full flex items-center gap-2 w-[200px]! max-sm:w-full"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        name="search"
        className="w-full"
        placeholder={placeholder}
        onChange={handleInput}
        value={input}
        suffix={
          <button type="submit">
            <SystemSearch
              className={cn(
                "w-4 h-4",
                input ? "text-textBrandSecondary" : "text-textTertiary",
              )}
            />
          </button>
        }
      />
    </form>
  );
}
