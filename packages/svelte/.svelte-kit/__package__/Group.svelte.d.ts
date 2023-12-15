import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        ids: {
            image: string;
            eyeball: string;
            eyeframe: string;
            gradient: string;
        };
        paths: {
            body: string;
            eyeball: string;
            eyeframe: string;
        };
        fills: {
            rect: string;
            path: string;
        };
        markers: ({
            x: number;
            y: number;
            transform?: undefined;
        } | {
            x: number;
            y: number;
            transform: string;
        })[];
        eyeItems: readonly ["eyeball", "eyeframe"];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type GroupProps = typeof __propDef.props;
export type GroupEvents = typeof __propDef.events;
export type GroupSlots = typeof __propDef.slots;
export default class Group extends SvelteComponent<GroupProps, GroupEvents, GroupSlots> {
}
export {};
