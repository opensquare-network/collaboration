import Steps from "../steps";
import Panel from "@/components/postDetail/panel";

export default function Main() {
  const steps = [
    { title: "Space profile" },
    { title: "Assets" },
    { title: "Strategies" },
  ];

  return (
    <Panel>
      <Steps steps={steps} currentStep={1} />
    </Panel>
  );
}
