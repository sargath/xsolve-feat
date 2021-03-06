import {EnvVariablesSet} from './env-variables-set';
import {SummaryItemsSet} from './summary-items-set';
import {Source} from './source';

export class Build {

    readonly sources: { [sourceId: string]: Source };
    readonly services: { [sourceId: string]: any };
    readonly featVariables: { [sourceId: string]: string };
    readonly envVariables: EnvVariablesSet;
    readonly summaryItems: SummaryItemsSet;

    readonly fullBuildPath: string;
    readonly fullBuildHostPath: string;

    constructor(
        readonly id: string,
        readonly hash: string,
        readonly config: any,
    ) {
        this.sources = {};
        this.services = {};
        this.featVariables = {};
        this.envVariables = new EnvVariablesSet();
        this.summaryItems = new SummaryItemsSet();
    }

    addSource(source: Source): void {
        this.sources[source.id] = source;
    }

    addFeatVariable(name: string, value: string): void {
        this.featVariables[name] = value;
    }

}
