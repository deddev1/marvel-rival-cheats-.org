import { useTranslation } from 'react-i18next';
import I18nProvider from './I18nProvider';

type Props = {
	locale: string;
};

function HomeAboutInner() {
	const { t } = useTranslation();

	return (
		<div className="home__prose-callout">
			<h2 id="home-about-title" className="home__prose-kicker">
				{t('home.aboutTitle')}
			</h2>
			<p>{t('home.aboutP1')}</p>
			<p>
				{t('home.aboutP2Before')}{' '}
				<a href="/marvel-rivals-cheats/">{t('home.aboutPillar')}</a>
				{t('home.aboutP2Mid')}
				<a href="/marvel-rivals-esp/">{t('home.aboutEsp')}</a>
				{t('home.aboutP2Mid')}
				<a href="/marvel-rivals-aimbot/">{t('home.aboutAimbot')}</a>
				{t('home.aboutP2Or')}
				<a href="/updates/">{t('home.aboutUndetected')}</a>
				{t('home.aboutP2After')}
			</p>
		</div>
	);
}

export default function HomeAboutApp(props: Props) {
	return (
		<I18nProvider locale={props.locale}>
			<HomeAboutInner />
		</I18nProvider>
	);
}
