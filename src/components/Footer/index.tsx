import React from 'react';
import styles from './style.module.css';
import { FOOTER_DATA } from '@/constants';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
} from '@mui/material';

const Footer: React.FC = () => {
  const { groups, sourceInfo, copyright, note } = FOOTER_DATA;

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {/* Left group */}
          <div className={styles.leftGroup}>
            {groups.slice(0, 3).map((section) => (
              <Section section={section} key={section.name} />
            ))}
          </div>

          {/* Right group */}
          <Box className={styles.rightGroup}>
            <Box className={styles.col}>
              <Section section={groups[3]} />
            </Box>

            <Box className={styles.col}>
              <Typography className={styles.sectionTitle} component="h3">
                網站資料來源
              </Typography>
              <Box className={styles.sourceText}>
                {sourceInfo.map((text, i) => (
                  <Typography key={i} className={styles.sourceParagraph}>
                    {text}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copy}>{copyright}</div>
          <div className={styles.note}>{note}</div>
        </div>
      </div>
    </footer>
  );
};

const Section = ({
  section,
}: {
  section: { name: string; items: { label: string; name: string; url: string }[] };
}) => (
  <div className={styles.col}>
    <Typography className={styles.sectionTitle} component="h3">
      {section.name}
    </Typography>
    <ul className={styles.list}>
      {section.items.map((item) => (
        <li key={item.name}>
          <a className={styles.link} href={item.url}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
