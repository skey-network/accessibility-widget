import {
  type CSSProperties,
  type ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";

import classNames from "classnames";
import { I18nextProvider, useTranslation } from "react-i18next";

import { customI18n } from "@i18n/index";
import { useFocusTrap } from "@hooks/useFocusTrap";
import { AccessIcon, CheckIcon } from "@assets/icons";
import { useLangObserver } from "@hooks/useLangObserver";
import useLocationHelper from "@hooks/useLocationHelper";
import { LeftContainer } from "@components/LeftContainer";
import { ClickAwayListener } from "@components/ClickAwayListener";
import { getPositionInfo, type Position } from "@utils/positioner";
import { Accessibility, AccessibilityContext } from "@context/accessibilityContext";

import type { Brands } from "@src/types/global";
import { BRAND_INFO, DEFAULT_POSITION } from "@config";

import "./Widget.scss";
import { createPortal } from "react-dom";
import { useSiblingWatcher } from "@hooks/useSiblingWatcher";

export interface Colors {
  bg?: string;
  fg?: string;
  theme?: string;
  font?: string;
}

export interface WidgetProps {
  colors?: Colors;
  paths?: string[];
  brand?: Brands;
  customPosition?: Position;
  portal?: boolean;
}

export interface WidgetRef {
  inject: () => void;
}

const access = new Accessibility();

const Widget = forwardRef(
  (
    { colors, brand = "CARUMA", paths = ["*"], customPosition = DEFAULT_POSITION, portal = true }: WidgetProps,
    ref: ForwardedRef<WidgetRef>
  ) => {
    const lang = useLangObserver();
    const { location, visible } = useLocationHelper(paths);
    const { t, i18n } = useTranslation("translation", { i18n: customI18n, lng: lang });
    const [popup, setPopup] = useState(false);
    const [anySelected, setAnySelected] = useState(false);

    const { ref: focusTrapRef, isUsingKeyboard, setActive } = useFocusTrap();
    const triggerRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      inject: access.inject
    }));

    useEffect(() => {
      updateSelection();
      window.addEventListener("click", onClickInjector);
      access.addListener(updateSelection);

      return () => {
        window.removeEventListener("click", onClickInjector);
        access.removeListener(updateSelection);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    useEffect(() => {
      if (visible) {
        access.inject();
      }
    }, [visible]);

    useSiblingWatcher(".suspend", () => {
      access.inject();
    });

    useEffect(() => {
      setActive(popup);

      if (!popup && document.activeElement === document.body) {
        triggerRef.current?.focus();
        return;
      }

      function onKey(e: KeyboardEvent) {
        const classes = (e.target as SVGSVGElement)?.classList;
        if (e.key === "Escape" || (classes.contains("back") && e.key === "Enter")) {
          hidePopup();
          e.stopPropagation();
          e.preventDefault();
        }
      }

      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [popup, isUsingKeyboard, setActive, triggerRef]);

    const onClickInjector = () => {
      if (!visible) return;
      setTimeout(() => {
        access.inject();
      }, 100);
    };

    const updateSelection = () => {
      setAnySelected(
        access.fontSize > 0 ||
          access.lineHeight > 0 ||
          access.charSpacing > 0 ||
          access.markLinks ||
          access.markTitles ||
          access.contrast ||
          access.grayScale ||
          access.invert
      );
    };

    const togglePopup = () => {
      setPopup((prev) => !prev);
    };

    const hidePopup = () => {
      setPopup(false);
    };

    if (!visible) return null;

    const brandInfo = BRAND_INFO[brand];
    const cssProps = {
      "--bg": colors?.bg ?? brandInfo.colors.bg,
      "--fg": colors?.fg ?? brandInfo.colors.fg,
      "--font": colors?.font ?? brandInfo.colors.font,
      "--theme": colors?.theme ?? brandInfo.colors.theme
    } as CSSProperties;

    const customStyle = getPositionInfo(customPosition);

    const mainClass = classNames("access-btn", customStyle.className, { expanded: popup });
    const checkClass = classNames("check", { visible: anySelected });

    const element = (
      <I18nextProvider i18n={i18n}>
        <AccessibilityContext.Provider value={{ access }}>
          <ClickAwayListener onClickAway={hidePopup}>
            <div
              className={mainClass}
              style={{ ...cssProps, ...customStyle.style }}
              ref={focusTrapRef}
              aria-expanded={popup}
              aria-controls="accessibility-panel"
            >
              <LeftContainer
                poweredByLogo={brandInfo.icon}
                poweredByLink={brandInfo.url}
                anySelected={anySelected}
                hidePopup={hidePopup}
                isUsingKeyboard={isUsingKeyboard}
                open={popup}
                cssProps={cssProps}
              />
              <button className="image" onClick={togglePopup} ref={triggerRef}>
                <div className="corner" />
                <AccessIcon aria-label={t("aria.accessBtn")} />
                <CheckIcon className={checkClass} />
              </button>
            </div>
          </ClickAwayListener>
        </AccessibilityContext.Provider>
      </I18nextProvider>
    );

    return portal ? createPortal(element, document.body) : element;
  }
);

export default Widget;
