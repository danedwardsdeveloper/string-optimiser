export type InitialiserConfig = {
	minimumLength: number
	maximumLength: number
	separator?: string
}

export type OptimiserInputWithBase = {
	base: string
	additionalPhraseOptions: string[]
}

export type OptimiserInputWithBaseOptions = {
	baseOptions: string[]
	additionalPhraseOptions: string[]
}

export type OptimiserInput = OptimiserInputWithBase | OptimiserInputWithBaseOptions

export type NonConfiguredOptimiserInput = (OptimiserInputWithBase | OptimiserInputWithBaseOptions) & InitialiserConfig

export type InitialisedOptimiser = (input: OptimiserInput) => string
