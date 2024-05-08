'use client';

import {
  Children,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Tab} from '@headlessui/react';
import clsx from 'clsx';
import {create} from 'zustand';

import {Tag} from '@/components/Tag';

function getPanelTitle({ title }) {
  return title ?? 'Tab';
}

function TabPanelHeader({tag, label}) {
  if (!tag && !label) {
    return null;
  }

  return (
    <div className="flex h-9 items-center gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 bg-blue-500 px-4 dark:border-b-white/5 dark:bg-white/1">
      {tag && (
        <div className="dark flex">
          <Tag variant="small">{tag}</Tag>
        </div>
      )}
      {tag && label && (
        <span className="h-0.5 w-0.5 rounded-sm bg-zinc-500" />
      )}
      {label && (
        <span className="font-mono text-xs text-zinc-400">{label}</span>
      )}
    </div>
  );
}

function TabPanel({tag, label, code, children}) {
  const child = Children.only(children);

  return (
    <div className="group my-5">
      <TabPanelHeader
        tag={child.props.tag ?? tag}
        label={child.props.label ?? label}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

function TabGroupHeader({title, children, selectedIndex}) {
  const hasTabs = Children.count(children) > 1;

  if (!title && !hasTabs) {
    return null;
  }

  return (
    <div className="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-200 dark:border-zinc-800 dark:bg-transparent">
      {title && (
        <h3 className="mr-auto pt-3 text-xs font-semibold text-white">
          {title}
        </h3>
      )}
      {hasTabs && (
        <Tab.List className="-mb-px flex gap-4 text-md font-medium">
          {Children.map(children, (child, childIndex) => (
            <Tab
              className={clsx(
                  'border-b py-3 transition ui-not-focus-visible:outline-none',
                childIndex === selectedIndex ?
                  'border-irohPurple-500 text-blue-500' :
                  'border-transparent text-zinc-400 hover:text-zinc-300',
              )}
            >
              {getPanelTitle(child.props)}
            </Tab>
          ))}
        </Tab.List>
      )}
    </div>
  );
}

function TabGroupPanels({children, ...props}) {
  const hasTabs = Children.count(children) > 1;

  if (hasTabs) {
    return (
      <Tab.Panels>
        {Children.map(children, (child) => (
          <Tab.Panel>
            <TabPanel {...props}>{child}</TabPanel>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    );
  }

  return <TabPanel {...props}>{children}</TabPanel>;
}

function usePreventLayoutShift() {
  const positionRef = useRef();
  const rafRef = useRef();

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return {
    positionRef,
    preventLayoutShift(callback) {
      const initialTop = positionRef.current.getBoundingClientRect().top;

      callback();

      rafRef.current = window.requestAnimationFrame(() => {
        const newTop = positionRef.current.getBoundingClientRect().top;
        window.scrollBy(0, newTop - initialTop);
      });
    },
  };
}

const usePreferredLanguageStore = create((set) => ({
  preferredLanguages: [],
  addPreferredLanguage: (language) =>
    set((state) => ({
      preferredLanguages: [
        ...state.preferredLanguages.filter(
            (preferredLanguage) => preferredLanguage !== language,
        ),
        language,
      ],
    })),
}));

function useTabGroupProps(availableLanguages) {
  const {preferredLanguages, addPreferredLanguage} = usePreferredLanguageStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeLanguage = [...availableLanguages].sort(
      (a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a),
  )[0];
  const languageIndex = availableLanguages.indexOf(activeLanguage);
  const newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex;
  if (newSelectedIndex !== selectedIndex) {
    setSelectedIndex(newSelectedIndex);
  }

  const {positionRef, preventLayoutShift} = usePreventLayoutShift();

  return {
    as: 'div',
    ref: positionRef,
    selectedIndex,
    onChange: (newSelectedIndex) => {
      preventLayoutShift(() =>
        addPreferredLanguage(availableLanguages[newSelectedIndex]),
      );
    },
  };
}

const TabGroupContext = createContext(false);

export function TabGroup({children, title, ...props}) {
  const languages = Children.map(children, (child) => getPanelTitle(child.props));
  const tabGroupProps = useTabGroupProps(languages);
  const hasTabs = Children.count(children) > 1;
  const Container = hasTabs ? Tab.Group : 'div';
  const containerProps = hasTabs ? tabGroupProps : {};
  const headerProps = hasTabs ?
    {selectedIndex: tabGroupProps.selectedIndex} :
    {};

  return (
    <TabGroupContext.Provider value={true}>
      <Container
        {...containerProps}
        className="not-prose my-6 overflow-hidden"
      >
        <TabGroupHeader title={title} {...headerProps}>
          {children}
        </TabGroupHeader>
        <TabGroupPanels {...props}>{children}</TabGroupPanels>
      </Container>
    </TabGroupContext.Provider>
  );
}

