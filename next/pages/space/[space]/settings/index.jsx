export default function Settings() {
  return null;
}

export async function getServerSideProps(context) {
  const { space } = context.params;
  return {
    redirect: {
      permanent: true,
      destination: `/space/${space}/settings/profile`,
    },
  };
}
