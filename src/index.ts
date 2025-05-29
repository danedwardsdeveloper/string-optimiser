import type { InitialisedOptimiser, InitialiserConfig, NonConfiguredOptimiserInput, OptimiserInput } from './types.js'

export function optimiseString(input: NonConfiguredOptimiserInput): string {
	const { minimumLength, maximumLength, separator = ' ' } = input

	if (maximumLength < minimumLength) {
		throw new Error('Maximum length cannot be less than minimum length')
	}

	const bases = 'base' in input ? [input.base] : input.baseOptions
	const { additionalPhraseOptions } = input

	let bestResult: string | null = null
	let bestScore = -1

	for (const base of bases) {
		if (base.length > maximumLength) {
			continue
		}

		let result: string

		if (base.length >= minimumLength && additionalPhraseOptions.length === 0) {
			result = base
		} else if (base.length >= minimumLength && base.length <= maximumLength) {
			const sortedPhrases = [...additionalPhraseOptions].sort((a, b) => {
				const lengthWithA = base.length + separator.length + a.length
				const lengthWithB = base.length + separator.length + b.length

				if (lengthWithA > maximumLength && lengthWithB > maximumLength) {
					return lengthWithA - lengthWithB
				}

				if (lengthWithA > maximumLength) return 1
				if (lengthWithB > maximumLength) return -1

				return lengthWithB - lengthWithA
			})

			result = base
			for (const phrase of sortedPhrases) {
				const combinedLength = base.length + separator.length + phrase.length
				if (combinedLength <= maximumLength) {
					result = base + separator + phrase
					break
				}
			}
		} else {
			let bestPhrase: string | null = null
			let bestPhraseLength = -1

			for (const phrase of additionalPhraseOptions) {
				const combinedLength = base.length + separator.length + phrase.length

				if (combinedLength >= minimumLength && combinedLength <= maximumLength) {
					if (combinedLength > bestPhraseLength) {
						bestPhrase = phrase
						bestPhraseLength = combinedLength
					}
				} else if (combinedLength < minimumLength && combinedLength > bestPhraseLength) {
					bestPhrase = phrase
					bestPhraseLength = combinedLength
				}
			}

			if (bestPhrase !== null) {
				result = base + separator + bestPhrase
			} else if (base.length >= minimumLength) {
				result = base
			} else {
				continue
			}
		}

		const length = result.length
		let score: number

		if (length >= minimumLength && length <= maximumLength) {
			score = 1000 + length
		} else if (length < minimumLength) {
			score = -(minimumLength - length)
		} else {
			score = -(length - maximumLength)
		}

		if (score > bestScore) {
			bestResult = result
			bestScore = score
		}
	}

	if (bestResult === null) {
		throw new Error('No combination can meet the minimum length requirement')
	}

	return bestResult
}

export function initialiseStringOptimiser({ minimumLength, maximumLength, separator = ' | ' }: InitialiserConfig): InitialisedOptimiser {
	return (input: OptimiserInput) => {
		return optimiseString({
			...input,
			minimumLength,
			maximumLength,
			separator,
		})
	}
}

export const metaTitleConfig: InitialiserConfig = {
	minimumLength: 50,
	maximumLength: 65,
}

export const optimiseTitle = initialiseStringOptimiser(metaTitleConfig)

export const metaDescriptionConfig: InitialiserConfig = {
	minimumLength: 50,
	maximumLength: 65,
}

export const optimiseDescription = initialiseStringOptimiser(metaDescriptionConfig)

export type * from './types.js'
