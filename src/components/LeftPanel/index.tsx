import React, { useState } from 'react';
import styles from './style.module.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { MAIN_MENU } from '@/constants';

const LeftPanel: React.FC = () => {
    const [expandedIds, setExpandedIds] = useState<string[]>(['finance']);
    const [selectedId, setSelectedId] = useState<string>('monthly');

    const handleToggle = (id: string) => {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSubItemClick = (id: string) => {
        setSelectedId(id);
    };

    return (
        <Box className={styles.leftPanel}>
            <Box className={styles.menuContainer}>
                <Box className={styles.mainMenuColumn}>
                    <List className={styles.mainMenu}>
                        {MAIN_MENU.map((item) => (
                            <ListItem key={item.id} disablePadding className={styles.mainMenuItemContainer}>
                                <ListItemButton
                                    onClick={() => handleToggle(item.id)}
                                    className={`${styles.mainMenuItem} ${expandedIds.includes(item.id) ? styles.active : ''}`}
                                >
                                    <ListItemText
                                        primary={item.label}
                                        className={styles.menuText}
                                    />
                                </ListItemButton>
                                {expandedIds.includes(item.id) && (
                                    <div className={styles.activeIndicator}></div>
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box className={styles.subMenuColumn}>
                    {MAIN_MENU.map((item) => (
                        item.sub && item.sub.length > 0 && expandedIds.includes(item.id) && (
                            <List key={item.id} className={styles.subMenu}>
                                {item.sub.map((sub) => (
                                    <ListItem key={sub.id} disablePadding>
                                        <ListItemButton
                                            onClick={() => handleSubItemClick(sub.id)}
                                            className={`${styles.subMenuItem} ${selectedId === sub.id ? styles.activeSubItem : ''}`}
                                        >
                                            <ListItemText
                                                primary={sub.label}
                                                className={styles.subMenuText}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default LeftPanel;
