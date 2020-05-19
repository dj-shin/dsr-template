declare type FunctionDecorator = <TFunction extends Function>(target: TFunction) => TFunction;
export const singleton: FunctionDecorator = (f) => {
    const handler = {
        apply: (target: any, thisArgs: any, args: any) => {
            if (!target.__result__) {
                target.__result__ = target(thisArgs, ...args);
            }
            return target.__result__;
        }
    };
    return new Proxy(f, handler);
};
