import { ResponseFormat } from "./ResponseFormat.enum";


interface RuleParameters {
    responseFormat : ResponseFormat;
    temperature    : number;
}

interface CustomGuideline {
    guidelineDetails : string;
    guidelineType    : string;
}

interface RuleVersion {
    customGuidelines : CustomGuideline[];
    description      : string;
    parameters       : RuleParameters;
    version          : string;
}

export interface Rule {
    versions : RuleVersion[];
    id       : string;
}
