import { SvelteComponent } from "svelte";
import { type Options } from '@qr-x/core';
import type { SVGAttributes } from 'svelte/elements';
declare const __propDef: {
    props: SVGAttributes<never> & Options;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type QrxProps = typeof __propDef.props;
export type QrxEvents = typeof __propDef.events;
export type QrxSlots = typeof __propDef.slots;
export default class Qrx extends SvelteComponent<QrxProps, QrxEvents, QrxSlots> {
}
export {};
