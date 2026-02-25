import {
  memo,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type MouseEvent,
  useCallback,
  useEffect,
  useState
} from "react";

import classNames from "classnames";
import { SINGLE_SELECT_COUNT } from "@config";

import type { ValidKeys } from "@src/types/global";
import { useAccess } from "@context/accessibilityContext";

import "./SettingsButton.scss";

export interface SettingsButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  name: string;
  children: React.ReactElement;
  field?: ValidKeys;
  totalSteps?: number;
}

export interface StepBarProps {
  index: number;
  step: number;
}

function SettingsButton({ children, name, field, totalSteps = SINGLE_SELECT_COUNT, ...rest }: SettingsButtonProps) {
  const { access } = useAccess();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!field) return;
    updateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, access[field!]]);

  const updateValue = useCallback(() => {
    if (!field) return;
    const v = access[field];

    setStep(typeof v === "boolean" ? (v ? 1 : 0) : v);
  }, [field, access]);

  const nextStep = (ev: MouseEvent<HTMLButtonElement>) => {
    rest.onClick?.(ev);
    if (!field) return;

    const next = step === totalSteps - 1 ? 0 : step + 1;

    access.set(field, next);
    setStep(next);
  };

  const mainClass = classNames("item", { selected: step > 0 }, rest.className);

  return (
    <button {...rest} className={mainClass} onClick={nextStep} aria-label={name}>
      <p className="name">{name}</p>
      {children}
      {field && totalSteps > 2 && step !== 0 && (
        <div className="bars">
          {Array.from({ length: totalSteps - 1 }).map((_, idx) => (
            <StepBar index={idx} step={step} key={`bar-${field}-${idx}`} />
          ))}
        </div>
      )}
    </button>
  );
}

const StepBar = memo(({ index, step }: StepBarProps) => {
  const barClass = classNames("bar", { on: index < step });
  return <div className={barClass} />;
});

export default memo(SettingsButton);
