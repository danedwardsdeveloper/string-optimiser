import { describe, expect, test } from 'vitest'
import { initialiseStringOptimiser, metaDescriptionConfig, metaTitleConfig } from '../src/index'
import type { OptimiserInput } from '../src/types'

const additionalPhraseOptions = [
	'Salon',
	'Beauty Salon',
	'Professional Beauty Salon',
	'Professional Beauty & Skincare Salon',
	'Professional Beauty & Skincare Salon Services',
	'Professional Beauty & Skincare Salon Services & Treatments',
	'Professional Beauty & Skincare Salon Services & Luxury Treatments',
	'Professional Beauty & Skincare Salon Services & Luxury Spa Treatments Available',
	'Professional Beauty & Skincare Salon Services & Luxury Spa Treatments Available Daily',
	'Professional Beauty & Skincare Salon Services & Luxury Spa Treatments Available Daily by Appointment Only',
]

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
		config: metaTitleConfig,
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
				caseDescription: 'Can handle basePhraseOptions that are already too long',
				input: {
					baseOptions: [
						'Professional Beauty & Skincare Salon Services & Luxury Spa Treatments Available Daily by Appointment Only',
						'Beauty by Jill',
					],
					additionalPhraseOptions,
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
		config: metaDescriptionConfig,
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

						console.log(caseDescription)
						console.log('Result: ', result)
						console.log('Min: ', config.minimumLength, 'Actual: ', result.length, 'Max: ', config.maximumLength)
						console.log('\n')

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
