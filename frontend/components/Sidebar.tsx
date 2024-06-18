'use client';

import React from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  links: { href: string, label: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  return (
    <div className={styles.sidebar}>
      <nav>
        <ul className={styles.navList}>
          {links.map((link, index) => (
            <li key={index} className={styles.navItem}>
              <a href={link.href} className={styles.navLink}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
