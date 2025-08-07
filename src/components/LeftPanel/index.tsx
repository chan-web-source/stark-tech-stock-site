import React, { useState } from 'react';
import styles from './style.module.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const MAIN_MENU = [
    {
        id: 'news',
        label: '最新動態',
        sub: []
    },
    {
        id: 'health',
        label: '股票健診',
        sub: []
    },
    {
        id: 'finance',
        label: '財務報表',
        sub: [
            { id: 'monthly', label: '每月營收' },
            { id: 'eps', label: '每股盈餘' },
            { id: 'bvps', label: '每股淨值' },
            { id: 'pl', label: '損益表' },
            { id: 'assets', label: '總資產' },
            { id: 'liabilities', label: '負債和股東權益' },
            { id: 'cashflow', label: '現金流量表' },
            { id: 'policy', label: '股利政策' },
            { id: 'ebook', label: '電子書' },
        ]
    },
    {
        id: 'profit',
        label: '獲利能力',
        sub: []
    },
    {
        id: 'safe',
        label: '安全性分析',
        sub: []
    },
    {
        id: 'growth',
        label: '成長力分析',
        sub: []
    },
    {
        id: 'value',
        label: '價值評估',
        sub: []
    },
    {
        id: 'director',
        label: '董監與籌碼',
        sub: []
    },
    {
        id: 'key',
        label: '關鍵指標',
        sub: []
    },
    {
        id: 'product',
        label: '產品組合',
        sub: []
    },
];

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
