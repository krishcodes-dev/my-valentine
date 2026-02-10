"use client";

import styles from './Candle.module.css';

export default function Candle() {
    return (
        <div className={styles.holder}>
            <div className={styles.candle}>
                <div className={styles['blinking-glow']}></div>
                <div className={styles.thread}></div>
                <div className={styles.glow}></div>
                <div className={styles.flame}></div>
            </div>
        </div>
    );
}
