import { observer } from "mobx-react";
import { useStore } from "../../helpers/use-store";
import CallForm from "./components/CallForm";
import CallRing from "./components/CallRing";

import "./index.less";

const CallQueue = observer(() => {
    const { callStore } = useStore();
    const { calls } = callStore;

    return (
        <div className={"call-queen"}>
            <div className={"_59v1"}>
                {calls!.map((answer, i) => {
                    if (answer.daNhacCuocGoi) return <CallForm key={`callForm ${i}`} linkDto={answer}></CallForm>;
                    else return <CallRing key={`callRing ${i}`} linkDto={answer}></CallRing>;
                })}
            </div>
        </div>
    );
});
export default CallQueue;
