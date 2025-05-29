import { optimiseTitle } from 'string-optimiser'

const title = optimiseTitle({
	base: 'Beauty by Jill',
	additionalPhraseOptions: [
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
	],
})

// Test with baseOptions
const titleWithOptions = optimiseTitle({
	baseOptions: ['Beauty by Jill', "Jill's Professional Beauty Salon", 'Premium Beauty Services by Jill'],
	additionalPhraseOptions: ['Expert Treatments', 'Luxury Experience', 'Professional Care'],
})

console.log('Title:', title)
console.log('Length:', title.length)
console.log('\nTitle with options:', titleWithOptions)
console.log('Length:', titleWithOptions.length)

/*
pnpm tsx usage
*/
