import { metaDescriptionConfig, metaTitleConfig, optimiseDescription, optimiseTitle } from 'string-optimiser'

const examples = [
	{
		config: metaTitleConfig,
		result: optimiseTitle({
			base: 'Chapter 1',
			additionalPhraseOptions: ['Crime and Punishment', 'Crime and Punishment by Fyodor Dostoevsky'],
		}),
	},
	{
		config: metaTitleConfig,
		result: optimiseTitle({
			baseOptions: ['Chapter 1', 'Chapter 1, Mrs. Rachel Lynde Is Surprised'],
			additionalPhraseOptions: ['Anne of Green Gables', 'Anne of Green Gables by Lucy Maud Montgomery'],
		}),
	},
	{
		config: metaDescriptionConfig,
		result: optimiseDescription({
			base: 'Jane Eyre by Charlotte Brontë',
			additionalPhraseOptions: [
				'ClassicReader.org',
				'Read the classic novel on ClassicReader.org',
				'Read the classic Gothic romance novel on ClassicReader.org',
				"Read Charlotte Brontë's timeless Gothic romance about an independent governess on ClassicReader.org",
				"Read Charlotte Brontë's groundbreaking Victorian Gothic romance following Jane from orphaned child to independent woman on ClassicReader.org",
			],
		}),
	},
]

for (const { result, config } of examples) {
	console.log('\n')
	console.log(result)
	console.log('Min:', config.minimumLength)
	console.log('Length:', result.length)
	console.log('Max:', config.maximumLength)
	console.log('\n')
}
