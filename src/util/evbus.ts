export class Evbus {
    private static evs:{[name: string]:Function[]} = {};
    static on (ev:string, cb:Function) {
        if (Evbus.evs[ev]) {
            Evbus.evs[ev].push(cb);
            return;
        }
        Evbus.evs[ev] = [cb]
        // evs = [];
        
    }
    static fire (ev:string, ...args:any[]) {
        if (Evbus.evs[ev] && Evbus.evs[ev].length)
        Evbus.evs[ev].forEach(cb => cb(...args));
    }
    static remove (ev:string) {

    }
}