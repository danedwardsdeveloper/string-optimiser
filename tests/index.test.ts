import { describe, expect, test } from 'vitest'
import { initialiseStringOptimiser } from '../src/index'
import type { OptimiserInput } from '../src/types'

const additionalPhraseOptions = Array.from({ length: 22 }, (_, i) => 'a'.repeat((i + 1) * 5))

type TestSuite = {
	suiteDescription: string
	config: {
		minimumLength: number
		maximumLength: number
	}
	cases: {
		caseDescription: string
		input: OptimiserInput
		expectError?: boolean
	}[]
}

const testSuites: TestSuite[] = [
	{
		suiteDescription: 'Title optimisation',
		config: {
			minimumLength: 50,
			maximumLength: 65,
		},
		cases: [
			{
				caseDescription: 'should optimise with single base',
				input: {
					base: 'Beauty by Jill',
					additionalPhraseOptions,
				},
			},
			{
				caseDescription: 'should optimise with base options',
				input: {
					baseOptions: ['Beauty by Jill', `Jill's Beauty Salon`, 'Professional Beauty by Jill'],
					additionalPhraseOptions,
				},
			},
			{
				caseDescription: 'should handle empty additional phrases',
				input: {
					base: 'Beauty by Jill Professional Salon and Spa Services',
					additionalPhraseOptions: [],
				},
			},
			{
				caseDescription: 'should throw error when impossible',
				input: {
					base: 'Short',
					additionalPhraseOptions: ['tiny'],
				},
				expectError: true,
			},
		],
	},
	{
		suiteDescription: 'Description optimisation',
		config: {
			minimumLength: 70,
			maximumLength: 155,
		},
		cases: [
			{
				caseDescription: 'should optimise description length',
				input: {
					base: 'Beauty by Jill offers professional treatments',
					additionalPhraseOptions,
				},
			},
		],
	},
]

describe('String optimiser', () => {
	for (const { suiteDescription, config, cases } of testSuites) {
		describe(suiteDescription, () => {
			const optimiser = initialiseStringOptimiser(config)

			for (const { caseDescription, input, expectError } of cases) {
				test(caseDescription, () => {
					if (expectError) {
						expect(() => optimiser(input)).toThrow()
					} else {
						const result = optimiser(input)
						expect(result.length).toBeGreaterThanOrEqual(config.minimumLength)
						expect(result.length).toBeLessThanOrEqual(config.maximumLength)
						expect(result).toBeTruthy()
					}
				})
			}
		})
	}
})

/* 
pnpm vitest tests
*/
