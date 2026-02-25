import { memo, type CSSProperties, useMemo } from "react";

import classNames from "classnames";
import { MULTI_SELECT_COUNT } from "@config";
import { useTranslation } from "react-i18next";

import { Hint } from "@components/Hint";
import { customI18n } from "@i18n/index";
import type { ValidKeys } from "@src/types/global";
import { useAccess } from "@context/accessibilityContext";
import { SettingsButton } from "@components/SettingsButton";
import {
  BackIcon,
  ContrastIcon,
  FontSizeIcon,
  GrayscaleIcon,
  InvertIcon,
  LetterSpacingIcon,
  LineHeightIcon,
  MarkLinksIcon,
  MarkTitlesIcon,
  ResetIcon
} from "@assets/icons";

import "./LeftContainer.scss";

interface SettingsElement {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  field: ValidKeys;
  steps?: number;
}

export interface LeftContainerProps {
  anySelected: boolean;
  hidePopup: () => void;
  open: boolean;
  poweredByLogo?: string;
  poweredByLink?: string;
  isUsingKeyboard: boolean;
  cssProps?: CSSProperties;
}

function LeftContainer({ anySelected, hidePopup, open, poweredByLogo, poweredByLink, cssProps }: LeftContainerProps) {
  const { t } = useTranslation(undefined, { i18n: customI18n });
  const { access } = useAccess();
  const elements: SettingsElement[] = useMemo(
    () => [
      { name: t("settings.fontSize"), icon: FontSizeIcon, steps: MULTI_SELECT_COUNT, field: "fontSize" },
      { name: t("settings.lineHeight"), icon: LineHeightIcon, steps: MULTI_SELECT_COUNT, field: "lineHeight" },
      { name: t("settings.letterSpacing"), icon: LetterSpacingIcon, steps: MULTI_SELECT_COUNT, field: "charSpacing" },
      { name: t("settings.markLinks"), icon: MarkLinksIcon, field: "markLinks" },
      { name: t("settings.markTitles"), icon: MarkTitlesIcon, field: "markTitles" },
      { name: t("settings.contrast"), icon: ContrastIcon, field: "contrast" },
      { name: t("settings.grayscale"), icon: GrayscaleIcon, field: "grayScale" },
      { name: t("settings.invert"), icon: InvertIcon, field: "invert" }
    ],
    [t]
  );

  const reset = () => {
    access.clear();
  };

  const resetClass = classNames({ visible: anySelected });

  return (
    <div className="accessibility-container">
      <div className="top">
        <BackIcon className="back" onClick={hidePopup} aria-label={t("aria.back")} tabIndex={0} />
        <SettingsButton className={resetClass} name={t("settings.revert")} onClick={reset} tabIndex={open ? 0 : -1}>
          <ResetIcon />
        </SettingsButton>
      </div>
      <div className="items">
        {elements.map((element, idx) => (
          <SettingsButton
            name={element.name}
            totalSteps={element.steps}
            field={element.field}
            key={`access-item-${idx}`}
            tabIndex={open ? 0 : -1}
          >
            <element.icon />
          </SettingsButton>
        ))}
      </div>
      <div className="bottom-row">
        <Hint.Simple className="info-icon" cssProps={cssProps}>
          {t("storageDisclosure")}
        </Hint.Simple>
        {poweredByLogo && (
          <a className="powered-by" href={poweredByLink} target="_blank" rel="noreferrer">
            <p>{t("poweredBy")}</p>
            <img src={poweredByLogo} alt="logo" />
          </a>
        )}
      </div>
    </div>
  );
}

export default memo(LeftContainer);
