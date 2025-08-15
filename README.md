

## [next-intl国际化4.0](https://next-intl.dev/)

```json
"next-intl": "^4.3.4",
```



[与服务器操作、元数据和路由处理程序一起](https://next-intl.dev/docs/environments/actions-metadata-route-handlers)[使用`next-intl`](https://next-intl.dev/docs/environments/actions-metadata-route-handlers)

```tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('title')
    };
}
```

[基本使用](https://next-intl.dev/docs/usage/messages)

```tsx
// en.json
  "HomePage": {
    "title": "Hello world!",
    "about": "Go to the about page",
    "message": "Please refer to <guidelines>the guidelines</guidelines>."
  }


import { useTranslations } from 'next-intl';
// 根据语言环境对消息进行分组，建议使用组件名称作为命名空间，并将其作为应用中代码组织的主要单位。
const t = useTranslations('HomePage'); // 也可以不用,全局取
const base = () => <div>{t('title')}</div>


// 富文本
// markup自动转义消息中的动态值（如 {variable}），防止 XSS 攻击,消息内容包含用户输入或不可信数据时，需确保安全性。
const base = () => <div> 
    {
        t.markup('message', {
            guidelines: (chunks) => <span className="text-red-200">{chunks}</span>
        })
    }
</div>
// rich富文本渲染, 允许消息中嵌入 React 组件或 HTML 标签，不自动转义动态值。
const base = () => <div> 
    {
        t.rich('message', {
            guidelines: (chunks) => <span className="text-red-200">{chunks}</span>
        })
    }
</div>

```

消息列表

```tsx
import {useTranslations} from 'next-intl';
 
function CompanyStats() {
  const t = useTranslations('CompanyStats');
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
 
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <h2>{item.title}</h2>
          <p>{item.value}</p>
        </li>
      ))}
    </ul>
  );
}
```

