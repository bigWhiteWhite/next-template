'use client'

import { useTranslations } from "next-intl";

export default function Test() {
    const t = useTranslations('HomePage');
    const items = [
        {
            title: t('yearsOfService.title'),
            value: t('yearsOfService.value')
        },
        {
            title: t('happyClients.title'),
            value: t('happyClients.value')
        },
        {
            title: t('partners.title'),
            value: t('partners.value')
        }
    ];
    console.info("🚀 ~ file:client -----",)
    return (
        <div>{t('title')}
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.value}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
