import { vElPointEventListener } from "./directive/elPointEventListener";

declare module 'vue' {
    export interface ComponentCustomProperties {
        vElPointEventListener: typeof vElPointEventListener
    }
}
