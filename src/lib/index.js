import Cookies from "cookies";
import nextApi from "../services/nextApi";
import { useDispatch, useSelector } from "react-redux";
import { setAccount, accountSelector } from "../store/reducers/accountSlice";
import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function withLoginUser(getServerSideProps) {
  return async function (context) {
    const propsPromise = getServerSideProps(context);

    let options = undefined;
    const cookies = new Cookies(context.req, context.res);
    const authToken = cookies.get("auth-token");
    if (authToken) {
      options = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
    }
    const profilePromise = nextApi.fetch("auth/profile", {}, options);

    const [props, { result: account }] = await Promise.all([
      propsPromise,
      profilePromise,
    ]);
    return {
      ...props,
      props: {
        ...props.props,
        account: account ?? null,
      },
    };
  };
}

export function withLoginUserRedux(fnComponent) {
  return ({ account, ...props }) => {
    const dispatch = useDispatch();
    useIsomorphicLayoutEffect(() => {
      dispatch(setAccount(account));
    }, [account]);

    const storeAccount = useSelector(accountSelector);
    return fnComponent({
      account: storeAccount === undefined ? account : storeAccount,
      ...props,
    });
  };
}
