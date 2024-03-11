import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { string } from 'prop-types';

const FeatureList = [
  {
    title: '自由交流',
    description: (
      <>
        分享与机器人有关的一切知识
      </>
    ),
  },
  {
    title: '共同学习',
    description: (
      <>
        一起来成为全栈工程师吧
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
