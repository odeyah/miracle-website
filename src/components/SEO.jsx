import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
	title,
	description,
	keywords,
	image = '/og-image.png',
	url,
	type = 'website',
	author = 'אודה-י-ה דוד אבלס',
}) => {
	const siteTitle = 'מסע הניסים שלנו';
	const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
	const siteUrl = 'https://our-miracles.vercel.app/';
	const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
	const defaultDescription = 'סיפורי ניסים אמיתיים של אמונה, תקווה וישועה. הצטרפו לקהילה שלנו ושתפו את הניסים שלכם.';
	const finalDescription = description || defaultDescription;
	const defaultKeywords = 'ניסים, אמונה, סיפורי ניסים, ישועה, תפילה, יהדות, השגחה פרטית';
	const finalKeywords = keywords || defaultKeywords;

	return (
		<Helmet>
			{/* Basic Meta Tags */}
			<html lang='he' dir='rtl' />
			<title>{fullTitle}</title>
			<meta name='description' content={finalDescription} />
			<meta name='keywords' content={finalKeywords} />
			<meta name='author' content={author} />
			<meta name='robots' content='index, follow' />
			<link rel='canonical' href={fullUrl} />

			{/* Open Graph / Facebook */}
			<meta property='og:type' content={type} />
			<meta property='og:url' content={fullUrl} />
			<meta property='og:title' content={fullTitle} />
			<meta property='og:description' content={finalDescription} />
			<meta property='og:image' content={`${siteUrl}${image}`} />
			<meta property='og:locale' content='he_IL' />
			<meta property='og:site_name' content={siteTitle} />

			{/* Twitter */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:url' content={fullUrl} />
			<meta name='twitter:title' content={fullTitle} />
			<meta name='twitter:description' content={finalDescription} />
			<meta name='twitter:image' content={`${siteUrl}${image}`} />

			{/* Additional SEO */}
			<meta name='theme-color' content='#2563eb' />
			<meta name='format-detection' content='telephone=yes' />
			{/* Structured Data */}
			{type === 'article' && (
				<script type='application/ld+json'>
					{JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Article',
						headline: fullTitle,
						description: finalDescription,
						author: {
							'@type': 'Person',
							name: author,
						},
						publisher: {
							'@type': 'Organization',
							name: siteTitle,
						},
						url: fullUrl,
						inLanguage: 'he-IL',
					})}
				</script>
			)}

			{type === 'website' && (
				<script type='application/ld+json'>
					{JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						name: siteTitle,
						description: finalDescription,
						url: siteUrl,
						inLanguage: 'he-IL',
					})}
				</script>
			)}
		</Helmet>
	);
};

export default SEO;
